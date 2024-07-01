import {Component, inject} from '@angular/core';
import {Answer, AnswerInput, Question} from "../../interfaces";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {FormStateService} from "../../services/form-state/form-state.service";
import {ActivatedRoute, Router} from "@angular/router";
import {QuestionsService} from "../../services/questions/questions.service";
import {Observable, tap} from "rxjs";
import {UiComponent} from "../../components/ui/ui.component";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-edit-answer',
  standalone: true,
  imports: [
    UiComponent,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './edit-answer.component.html',
  styleUrl: './edit-answer.component.scss'
})
export class EditAnswerComponent {
  answerFormIsValid = false;
  question!: Question;

  private _fb = inject(FormBuilder)
  private _formStateService = inject(FormStateService)
  private _router = inject(Router)
  private _activatedRoute = inject(ActivatedRoute);
  private _questionsService = inject(QuestionsService);
  private _routeId!:string;
  question$ =new Observable<Question>()
  answer$ = new Observable<Answer>()
  questionId!: number;
  answerId!:number;
  answer!:Answer;
  answerForm = this._fb.group({
    text: ['', Validators.required],
    weight: [null as any, [Validators.required, Validators.min(0)]],
    questionId: [null as any, Validators.required],
    recommendation: ['']
  });

  questions$ = this._activatedRoute.params.pipe(tap((params) => {
    const ids = params['id'].split('-')
    this.answerId = Number(ids.at(-1));
    this.questionId = Number(ids.at(-2));
    this._routeId =ids.slice(0, 2).join('-')
    this.answerForm.patchValue({ questionId: this.questionId});
    this.answer$ = this._questionsService.getSingleAnswer(this.answerId).pipe(tap(answer => {
      this.answerForm.patchValue({ text: answer.text, weight: answer.weight, recommendation: answer.recommendation});
      this.answer =answer;
    }))
    this.question$ = this._questionsService.getSingleQuestion(this.questionId).pipe(tap(quiz => {
      this.question =quiz;
    }))
  }))

  answerForm$ = this.answerForm.valueChanges.pipe(tap(vals => {
    const answerInput = {
      text: vals.text,
      weight: Number(vals.weight),
      questionId: Number(this.questionId),
      recommendation: vals.recommendation,
    }
    this._formStateService.setAnswerForm(answerInput as AnswerInput)
    this._formStateService.setAnswerFormIsValid(this.answerForm.valid)
  }))

  answerFormIsValid$ = this._formStateService.answerFormIsValid$.pipe(tap(isValid => this.answerFormIsValid = isValid))

  submit$: Observable<Answer> = new Observable();

  submit() {
    delete this.answerForm.value.questionId;
    this.submit$ = this._formStateService.editAnswer({...this.answer,...this.answerForm.value} as Answer, this.questionId).pipe(tap(res => {
    }));
  }

  cancel(){
    this._router.navigateByUrl(`/questions/sub-section/${this._routeId}`);
  }
}
