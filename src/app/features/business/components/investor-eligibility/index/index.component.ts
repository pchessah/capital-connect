import { Component, inject } from '@angular/core';
import { BusinessPageService } from '../../../services/business-page/business.page.service';
import { QuestionsService } from "../../../../questions/services/questions/questions.service";
import { SubmissionService, SubMissionStateService, UserSubmissionResponse } from "../../../../../shared";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { tap } from "rxjs/operators";
import { combineLatest, Observable } from "rxjs";
import { Question } from "../../../../questions/interfaces";
import { CommonModule } from "@angular/common";
import {Router} from "@angular/router";
import {ProgressBarComponent} from "../../../../../core/components/progress-bar/progress-bar.component";
import {loadInvestorEligibilityQuestions} from "../../../../../shared/business/services/onboarding.questions.service";

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ProgressBarComponent],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})

export class IndexComponent {
  private _pageService = inject(BusinessPageService);
  private _questionService = inject(QuestionsService);
  private _submissionService = inject(SubmissionService);
  private _submissionStateService = inject(SubMissionStateService)
  private _formBuilder = inject(FormBuilder);

  private _router =inject(Router);

  formGroup: FormGroup = this._formBuilder.group({});
  questions$ = this._questionService.getQuestionsOfSubSection(loadInvestorEligibilityQuestions().LANDING).pipe(
    tap(questions => {
      this.questions = questions;
      this._createFormControls();
    })
  );
  currentEntries$ = this._submissionStateService.currentUserSubmission$;

  // init$ = combineLatest([this.questions$, this.currentEntries$]).pipe(tap(res => {
  //   if (this._hasMatchingQuestionId(res[0], res[1])) {
  //     this.setNextScreen();
  //   }
  // }))

  submit$ = new Observable<unknown>()

  questions: Question[] = [];

  private _hasMatchingQuestionId(questions: Question[], responses: UserSubmissionResponse[]): boolean {
    // Create a set of question ids from the responses array
    const responseQuestionIds = new Set(responses.map(response => response.question.id));

    // Check if any question in the questions array has an id in the responseQuestionIds set
    return questions.some(question => responseQuestionIds.has(question.id));
  }

  private _createFormControls() {
    this.questions.forEach(question => {
      this.formGroup.addControl('question_' + question.id, this._formBuilder.control('', Validators.required));
    });
  }

  onSubmit() {
    const formValues = this.formGroup.value;
    const submissionData = this.questions.map(question => ({
      questionId: question.id,
      answerId: formValues['question_' + question.id]
    }));

    this.submit$ = this._submissionService.createMultipleSubmissions(submissionData).pipe(tap(res => {
      this.setNextScreen()
    }))

  }

  skip() {
    // this._pageService.setCurrentPage(1);
    this._router.navigateByUrl('/business')
  }

  setNextScreen() {

    this._pageService.setCurrentPage(2);
  }
}
