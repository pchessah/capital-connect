import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { SharedModule } from '../../../../shared';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormStateService } from '../../services/form-state/form-state.service';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Answer, AnswerInput, Question } from '../../interfaces';

@Component({
  selector: 'app-answer-form-sample',
  standalone: true,
  imports: [CommonModule, SharedModule, ReactiveFormsModule],
  templateUrl: './answer-form-sample.component.html',
  styleUrl: './answer-form-sample.component.scss'
})
export class AnswerFormSampleComponent {
  private _fb = inject(FormBuilder)
  private _formStateService = inject(FormStateService)
  private _router = inject(Router)

  answerForm = this._fb.group({
    text: ['', Validators.required],
    weight: ['', [Validators.required, Validators.min(0)]],
    questionId: ['', Validators.required]
  });

  question$ = this.getQuestion()

  answerForm$ = this.answerForm.valueChanges.pipe(tap(vals => {
    const answerInput = {
      text: vals.text,
      weight: Number(vals.weight),
      questionId: Number(vals.questionId)
    }
    this._formStateService.setAnswerForm(answerInput as AnswerInput)
    this._formStateService.setAnswerFormIsValid(this.answerForm.valid)
  }))

  nextOperation$: Observable<Answer> = new Observable();

  onSubmit() {
    this.nextOperation$ = this._formStateService.createAnswer().pipe(tap(res => {
      if (res.id) {
        this._router.navigate(['/questions']);
      }
    }));
  }

  getQuestion(): Observable<Question> {
    const currentSubSectionThatNeedsQuestion = this._formStateService.getCurrentQuestionBeingEdited()
    return currentSubSectionThatNeedsQuestion as Observable<Question>
  }

}
