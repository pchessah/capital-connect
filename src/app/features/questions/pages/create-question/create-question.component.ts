import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { Observable, tap } from "rxjs";
import { QUESTION_FORM_STEPS } from "../../../../shared/interfaces/question.form.steps.enum";
import { FormStateService } from "../../services/form-state/form-state.service";
import { Question, QuestionInput, QuestionType, SubSection } from "../../interfaces";
import { UiComponent } from "../../components/ui/ui.component";
import { QuestionsService } from "../../services/questions/questions.service";

@Component({
  selector: 'app-create-question',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, UiComponent],
  templateUrl: './create-question.component.html',
  styleUrl: './create-question.component.scss'
})

export class CreateQuestionComponent {
  protected readonly STEPS = QUESTION_FORM_STEPS;
  private _fb = inject(FormBuilder)
  private _formStateService = inject(FormStateService)
  private _router = inject(Router)
  private _activatedRoute = inject(ActivatedRoute);
  private _questionsService = inject(QuestionsService);

  routeId!: string;
  subsection!: SubSection;

  questionForm = this._fb.group({
    subsectionId: [null as any, Validators.required],
    text: ['', Validators.required],
    type: ['', Validators.required],
    tooltip: ['', Validators.required],
    order: [0, Validators.required],
  });

  questionTypes: { label: string, value: QuestionType }[] = [
    { label: 'Multiple Choice', value: QuestionType.MULTIPLE_CHOICE },
    { label: 'Single Choice', value: QuestionType.SINGLE_CHOICE },
    { label: 'Short Answer', value: QuestionType.SHORT_ANSWER },
    { label: 'True/ False', value: QuestionType.TRUE_FALSE }
  ];

  questionForm$ = this.questionForm.valueChanges.pipe(tap(vals => {
    this._formStateService.setQuestionForm(vals as QuestionInput)
    this._formStateService.setQuestionFormIsValid(this.questionForm.valid);
  }));

  isQuestionFormValid$ = this._formStateService.questionFormIsValid$.pipe(tap(isValid => {
    this.isQuestionFormValid = isValid;
  }));

  questions$ = this._activatedRoute.paramMap.pipe(tap((res) => {

    this.routeId = (res as any).params['id'].trim();
    const ids = this.routeId.split('-')
    this.subsectionId = Number(ids.at(-1));

    this.questionForm.patchValue({ subsectionId: this.subsectionId })

    this.subSection$ = this._questionsService.getSingleSubsection(this.subsectionId).pipe(tap(vals => {
      this.subsection = vals;
    }));
  }));

  isQuestionFormValid = false;
  subsectionId!: number;
  question!: Question;

  subSection$: Observable<SubSection> = new Observable();
  createQuestion$: Observable<Question> = new Observable();

  submit() {
    this.createQuestion$ = this._formStateService.createQuestion(this.subsectionId).pipe(tap(res => {
      this.questionForm.reset();
      this.questionForm.patchValue({ subsectionId: this.subsectionId })
    }))
  }

  cancel() {
    this._router.navigateByUrl(`/questions/sub-section/${this.routeId}`);
  }

}
