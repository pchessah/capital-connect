
import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy } from '@angular/core';
import { QUESTION_FORM_STEPS } from "../../../../shared/interfaces/question.form.steps.enum";
import { SharedModule } from '../../../../shared';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormStateService } from '../../services/form-state/form-state.service';
import { Router } from '@angular/router';
import { UiComponent } from "../../components/ui/ui.component";
import { Observable, Subject, tap } from 'rxjs';
import { Answer, AnswerInput, Question } from '../../interfaces';

@Component({
  selector: 'app-answer-ui',
  standalone: true,
  imports: [SharedModule,
    UiComponent, CommonModule, ReactiveFormsModule
  ],
  templateUrl: './answer-ui.component.html',
  styleUrl: './answer-ui.component.scss'
})
export class AnswerUiComponent implements OnDestroy {
  answerFormIsValid = false;
  question!: Question;
  ngOnDestroy(): void {
    this.destroy$.next(true)
  }

  protected readonly STEPS = QUESTION_FORM_STEPS;
  private _fb = inject(FormBuilder)
  private _formStateService = inject(FormStateService)
  private _router = inject(Router)

  answerForm = this._fb.group({
    text: ['', Validators.required],
    weight: ['', [Validators.required, Validators.min(0)]],
    questionId: ['', Validators.required]
  });

  private _navState: { questionId: number, answerId: number } = this._router.getCurrentNavigation()?.extras.state as any;

  questionId: number = this._navState.questionId;

  destroy$ = new Subject<boolean>()

  question$ = this.getQuestion()

  answerForm$ = this.answerForm.valueChanges.pipe(tap(vals => {
    const answerInput = {
      text: vals.text,
      weight: Number(vals.weight),
      questionId: Number(this.questionId)
    }
    this._formStateService.setAnswerForm(answerInput as AnswerInput)
    this._formStateService.setAnswerFormIsValid(this.answerForm.valid)
  }))

  answerFormIsValid$ = this._formStateService.answerFormIsValid$.pipe(tap(isValid => this.answerFormIsValid = isValid))

  nextOperation$: Observable<Answer> = new Observable();

  submit() {
    this.nextOperation$ = this._formStateService.createAnswer(this.questionId).pipe(tap(res => {
      if (res.id) {
        this._router.navigate(['/questions']);
      }
    }));
  }

  getQuestion(): Observable<Question> {
    const currentSubSectionThatNeedsQuestion = this._formStateService.getCurrentQuestionBeingEdited(this.questionId).pipe(tap(q => {
      if(q){
        this.question = q;
        this.answerForm.get('questionId')?.patchValue(`${q.id}`);
      }
    }))
    return currentSubSectionThatNeedsQuestion as Observable<Question>
  }
}
