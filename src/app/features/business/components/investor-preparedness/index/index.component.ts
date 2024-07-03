import {Component, EventEmitter, inject, Output} from '@angular/core';
import { BusinessPageService } from '../../../services/business-page/business.page.service';
import {QuestionsService} from "../../../../questions/services/questions/questions.service";
import {Submission, SubmissionService, SubMissionStateService, UserSubmissionResponse} from "../../../../../shared";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {tap} from "rxjs/operators";
import {Question, QuestionType} from "../../../../questions/interfaces";
import { CommonModule } from "@angular/common";
import {RouterLink} from "@angular/router";
import {combineLatest, Observable} from "rxjs";
import {
  INVESTOR_PREPAREDNESS_SUBSECTION_IDS
} from "../../../../../shared/business/services/onboarding.questions.service";
import {DropdownModule} from "primeng/dropdown";
import {MultiSelectModule} from "primeng/multiselect";

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    DropdownModule,
    MultiSelectModule
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss',
})
export class IndexComponent {
  private _pageService = inject(BusinessPageService);
  private _questionService = inject(QuestionsService);
  private _submissionService = inject(SubmissionService);
  private _submissionStateService = inject(SubMissionStateService)
  private _formBuilder = inject(FormBuilder);
  questions: Question[] = [];
  formGroup: FormGroup = this._formBuilder.group({});

  questions$ = this._questionService.getQuestionsOfSubSection(INVESTOR_PREPAREDNESS_SUBSECTION_IDS.LANDING).pipe(
    tap(questions => {
      this.questions = questions;
      this._createFormControls();
    })
  );
  currentEntries$ = this._submissionStateService.currentUserSubmission$;
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
  setNextScreen() {
    this._pageService.setCurrentPage(2);
  }
  submit$ = new Observable<unknown>()
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

  protected readonly field_type = QuestionType;
}
