import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { BusinessPageService } from '../../../services/business-page/business.page.service';
import { QuestionsService } from '../../../../questions/services/questions/questions.service';
import { Question } from '../../../../questions/interfaces';
import { Submission, SubmissionService } from '../../../../../shared';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent {
  private _pageService = inject(BusinessPageService);
  private _questionService = inject(QuestionsService);
  private _submissionService = inject(SubmissionService);
  private _formBuilder = inject(FormBuilder);

  formGroup: FormGroup = this._formBuilder.group({});
  questions$ = this._questionService.getQuestionsOfSubSection(11).pipe(
    tap(questions => {
      this.questions = questions;
      this._createFormControls();
    })
  );

  submit$ = new Observable<unknown>()

  questions: Question[] = [];

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
    this.setNextScreen()

    // this.submit$ = this._submissionService.createMultipleSubmissions(submissionData).pipe(tap(res => {
    //   this.setNextScreen()
    // }))

  }

  skip() {
    this._pageService.setCurrentPage(1);
  }

  setNextScreen() {
    this._pageService.setCurrentPage(2);
  }
}
