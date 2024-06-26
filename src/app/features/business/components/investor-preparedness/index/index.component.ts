import {Component, EventEmitter, inject, Output} from '@angular/core';
import { BusinessPageService } from '../../../services/business-page/business.page.service';
import {QuestionsService} from "../../../../questions/services/questions/questions.service";
import {SubmissionService, SubMissionStateService, UserSubmissionResponse} from "../../../../../shared";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {tap} from "rxjs/operators";
import {Question} from "../../../../questions/interfaces";
import { CommonModule } from "@angular/common";
import {RouterLink} from "@angular/router";
import {combineLatest, Observable} from "rxjs";

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
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

  questions$ = this._questionService.getQuestionsOfSubSection(6).pipe(
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

  init$ = combineLatest([this.questions$, this.currentEntries$]).pipe(tap(res => {
    if(this._hasMatchingQuestionId(res[0], res[1])) { //Checks whether
      this.setNextScreen();
    }
  }))

  private _createFormControls() {
    this.questions.forEach(question => {
      this.formGroup.addControl('question_' + question.id, this._formBuilder.control('', Validators.required));
    });
  }
  setNextScreen() {
    this._pageService.setCurrentPage(2);
  }
  submit$ = new Observable<unknown>()
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
}
