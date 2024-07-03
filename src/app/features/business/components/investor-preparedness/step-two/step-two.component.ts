import {Component, inject} from '@angular/core';
import {Question, QuestionType} from "../../../../questions/interfaces";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {QuestionsService} from "../../../../questions/services/questions/questions.service";
import {BusinessPageService} from "../../../services/business-page/business.page.service";
import {Submission, SubmissionService, SubMissionStateService, UserSubmissionResponse} from "../../../../../shared";
import {combineLatest, Observable, tap} from "rxjs";
import { CommonModule } from "@angular/common";
import {CommandModule} from "@angular/cli/src/command-builder/command-module";
import {RouterLink} from "@angular/router";
import {
  INVESTOR_PREPAREDNESS_SUBSECTION_IDS
} from "../../../../../shared/business/services/onboarding.questions.service";
import {DropdownModule} from "primeng/dropdown";
import {MultiSelectModule} from "primeng/multiselect";

@Component({
  selector: 'app-step-two',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    DropdownModule,
    MultiSelectModule
  ],
  templateUrl: './step-two.component.html',
  styleUrl: './step-two.component.scss'
})
export class StepTwoComponent {
  questions: Question[] = [];
  field_type = QuestionType;
  private _formBuilder = inject(FormBuilder)
  private _questionService = inject(QuestionsService);
  private _pageService = inject(BusinessPageService);
  private _submissionService = inject(SubmissionService);
  formGroup: FormGroup = this._formBuilder.group({})
  private _submissionStateService = inject(SubMissionStateService)

  submission$ = new Observable<unknown>()
  questions$ = this._questionService.getQuestionsOfSubSection(INVESTOR_PREPAREDNESS_SUBSECTION_IDS.STEP_TWO).pipe(tap(questions => {
    this.questions = questions
    this._createFormControls();
  }))

  private _hasMatchingQuestionId(questions: Question[], responses: UserSubmissionResponse[]): boolean {
    const responseQuestionIds = new Set(responses.map(response => response.question.id));
    return questions.some(question => responseQuestionIds.has(question.id));
  }

  currentEntries$ = this._submissionStateService.currentUserSubmission$;

  private _createFormControls() {
    this.questions.forEach(question => {
      this.formGroup.addControl('question_' + question.id, this._formBuilder.control('', Validators.required));
    });
  }

  setNextScreen() {
    this._pageService.setCurrentStep(3)
  }

  goBack() {
    this._pageService.setCurrentStep(1);
  }

  handleSubmit() {
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
      } else if (question.type == this.field_type.SHORT_ANSWER) {
        const openQuestion = question.answers.find(a => a.text === 'OPEN');
        const answerId = openQuestion ? openQuestion.id : formValues['question_' + question.id]

        submissionData.push({
          questionId: question.id,
          answerId: parseInt(answerId),
          text: formValues['question_' + question.id]
        });
      } else {
        submissionData.push({
          questionId: question.id,
          answerId: Number(formValues['question_' + question.id]),
          text: question.type !== this.field_type.SINGLE_CHOICE && question.type !== this.field_type.TRUE_FALSE ? formValues['question_' + question.id] : ''
        });
      }
    });
    this.submission$ = this._submissionService.createMultipleSubmissions(submissionData).pipe(tap(res => {
      this.setNextScreen();
    }));
  }
}
