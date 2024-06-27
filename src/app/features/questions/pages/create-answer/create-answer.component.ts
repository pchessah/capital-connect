import {Component, inject} from '@angular/core';
import {Answer, AnswerInput, Question} from "../../interfaces";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {FormStateService} from "../../services/form-state/form-state.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable, tap} from "rxjs";
import {UiComponent} from "../../components/ui/ui.component";
import {CommonModule} from "@angular/common";
import {QuestionsService} from "../../services/questions/questions.service";

@Component({
  selector: 'app-create-answer',
  standalone: true,
  imports: [
    UiComponent,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './create-answer.component.html',
  styleUrl: './create-answer.component.scss'
})
export class CreateAnswerComponent {
  answerFormIsValid = false;
  question!: Question;

  private _fb = inject(FormBuilder)
  private _formStateService = inject(FormStateService)
  private _router = inject(Router)
  private _activatedRoute = inject(ActivatedRoute);
  private _questionsService = inject(QuestionsService);
  private _routeId!:string;
  question$ =new Observable<Question>()
  questionId!: number;
  answerForm = this._fb.group({
    text: ['', Validators.required],
    weight: ['', [Validators.required, Validators.min(0)]],
    questionId: [null as any, Validators.required]
  });

  questions$ = this._activatedRoute.params.pipe(tap((params) => {
    const ids = params['id'].split('-')
    this.questionId = Number(ids.at(-1));
    this._routeId =ids.slice(0, 2).join('-')
    this.answerForm.patchValue({ questionId: this.questionId});
    this.question$ = this._questionsService.getSingleQuestion(this.questionId).pipe(tap(quiz => {
      this.question =quiz;
    }))
  }))

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

  submit$: Observable<Answer> = new Observable();

  submit() {
    this.submit$ = this._formStateService.createAnswer(this.questionId).pipe(tap(res => {
      this.answerForm.reset();
    }));
  }

  cancel(){
    this._router.navigateByUrl(`/questions/sub-section/${this._routeId}`);
  }
}
