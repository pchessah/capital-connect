import { Component, inject } from '@angular/core';
import { BusinessPageService } from '../../../services/business-page/business.page.service';
import { QuestionsService } from "../../../../questions/services/questions/questions.service";
import { Submission, SubmissionService, SubMissionStateService, UserSubmissionResponse } from "../../../../../shared";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { tap } from "rxjs/operators";
import { combineLatest, Observable } from "rxjs";
import { Question, QuestionType } from "../../../../questions/interfaces";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { ProgressBarComponent } from "../../../../../core/components/progress-bar/progress-bar.component";
import { loadInvestorEligibilityQuestions } from "../../../../../shared/business/services/onboarding.questions.service";
import { DropdownModule } from "primeng/dropdown";
import { MultiSelectModule } from "primeng/multiselect";

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ProgressBarComponent, DropdownModule, MultiSelectModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})

export class IndexComponent {
  private _pageService = inject(BusinessPageService);
  private _questionService = inject(QuestionsService);
  private _submissionService = inject(SubmissionService);
  private _submissionStateService = inject(SubMissionStateService)
  private _formBuilder = inject(FormBuilder);
  field_type = QuestionType
  private _router = inject(Router);

  formGroup: FormGroup = this._formBuilder.group({});
  questions$ = this._questionService.getQuestionsOfSubSection(loadInvestorEligibilityQuestions().LANDING).pipe(
    tap(questions => {
      this.questions = questions;
      this._createFormControls();
    })
  );
  currentEntries$ = this._submissionStateService.currentUserSubmission$;

  submit$ = new Observable<unknown>()

  questions: Question[] = [];


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
      } else if (question.type == this.field_type.SHORT_ANSWER) {
        const openQuestion = question.answers.find(a => a.text === 'OPEN');
        const answerId = openQuestion ? openQuestion.id : formValues['question_' + question.id]

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

  skip() {
    // this._pageService.setCurrentPage(1);
    this._router.navigateByUrl('/business')
  }

  setNextScreen() {

    this._pageService.setCurrentPage(2);
  }
}
