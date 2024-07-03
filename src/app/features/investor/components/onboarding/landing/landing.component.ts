import {Component, inject} from '@angular/core';
import {QuestionsService} from "../../../../questions/services/questions/questions.service";
import {Submission, SubmissionService, SubMissionStateService, UserSubmissionResponse} from "../../../../../shared";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {INVESTOR_ONBOARDING_SUBSECTION_IDS} from "../../../../../shared/business/services/onboarding.questions.service";
import {tap} from "rxjs/operators";
import {combineLatest, Observable} from "rxjs";
import {Question, QuestionType} from "../../../../questions/interfaces";
import {CommonModule} from "@angular/common";
import {AuthModule} from "../../../../auth/modules/auth.module";
import {InvestorScreensService} from "../../../services/investor.screens.service";
import {DropdownModule} from "primeng/dropdown";
import {MultiSelectModule} from "primeng/multiselect";

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    AuthModule,
    CommonModule,
    ReactiveFormsModule,
    DropdownModule,
    MultiSelectModule
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {
  private _pageService = inject(InvestorScreensService);
  private _questionService = inject(QuestionsService);
  private _submissionService = inject(SubmissionService);
  private _submissionStateService = inject(SubMissionStateService)
  private _formBuilder = inject(FormBuilder);
  private _router =inject(Router);

  formGroup: FormGroup = this._formBuilder.group({});
  questions$ = this._questionService.getQuestionsOfSubSection(INVESTOR_ONBOARDING_SUBSECTION_IDS.LANDING).pipe(
    tap(questions => {
      this.questions = questions;
      this._createFormControls();
    })
  );
  currentEntries$ = this._submissionStateService.currentUserSubmission$;

  submit$ = new Observable<unknown>()

  questions: Question[] = [];

  private _hasMatchingQuestionId(questions: Question[], responses: UserSubmissionResponse[]): boolean {
    const responseQuestionIds = new Set(responses.map(response => response.question.id));
    return questions.some(question => responseQuestionIds.has(question.id));
  }

  private _createFormControls() {
    this.questions.forEach(question => {
      if (question.type === this.field_type.MULTIPLE_CHOICE) {
        this.formGroup.addControl('question_' + question.id, this._formBuilder.control([], Validators.required));
      } else {
        this.formGroup.addControl('question_' + question.id, this._formBuilder.control('', Validators.required));
      }
    });
  }

  onSubmit() {
    const formValues = this.formGroup.value;
    const submissionData: Submission[] = [];
    this.questions.forEach(question => {
      if (question.type === this.field_type.MULTIPLE_CHOICE) {
        const selectedAnswers = formValues['question_' + question.id];
        selectedAnswers.forEach((answerId: number) => {
          submissionData.push({
            questionId: question.id,
            answerId: answerId,
            text: ''
          });
        });
      }else if(question.type ==this.field_type.SHORT_ANSWER){
        const openQuestion = question.answers.find(a => a.text === 'OPEN');
        const answerId =openQuestion ? openQuestion.id : formValues['question_' + question.id]

        submissionData.push({
          questionId: question.id,
          answerId: parseInt(answerId),
          text: formValues['question_' + question.id]
        });
      }
      else {
        submissionData.push({
          questionId: question.id,
          answerId: Number(formValues['question_' + question.id]),
          text: question.type !== this.field_type.SINGLE_CHOICE && question.type !== this.field_type.TRUE_FALSE ? formValues['question_' + question.id] : ''
        });
      }
    });
    this.submit$ = this._submissionService.createMultipleSubmissions(submissionData).pipe(tap(res => {
      this.setNextScreen();
    }));

  }

  setNextScreen() {
    this._pageService.setCurrentScreen(2);
  }

  protected readonly field_type = QuestionType;
}
