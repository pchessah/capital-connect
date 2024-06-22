import { QUESTION_FORM_STEPS } from "../../../../shared/interfaces/question.form.steps.enum";
import { UiComponent } from "../../components/ui/ui.component";
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharedModule } from '../../../../shared';
import { CommonModule } from '@angular/common';
import { FormStateService } from '../../services/form-state/form-state.service';
import { combineLatest, Observable, of, Subject, takeUntil, tap } from 'rxjs';
import { Question, QuestionInput, QuestionType, SubSection } from '../../interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question-type-ui',
  standalone: true,
  imports: [
    UiComponent, SharedModule, CommonModule, ReactiveFormsModule
  ],
  templateUrl: './question-type-ui.component.html',
  styleUrl: './question-type-ui.component.scss'
})
export class QuestionTypeUiComponent implements OnInit, OnDestroy {

  protected readonly STEPS = QUESTION_FORM_STEPS;
  private _fb = inject(FormBuilder)
  private _formStateService = inject(FormStateService)
  private _router = inject(Router)

  questionForm = this._fb.group({
    subsectionId: ['', Validators.required],
    text: ['', Validators.required],
    type: ['', Validators.required]
  });

  private _navState: { questionId: number, subsectionId: number } = this._router.getCurrentNavigation()?.extras.state as any;

  private _subsectionId: number = this._navState?.subsectionId;
  questionId: number = this._navState.questionId;

  destroy$ = new Subject<boolean>()

  questionTypes: { label: string, value: QuestionType }[] = [
    { label: 'Multiple Choice', value: QuestionType.MULTIPLE_CHOICE },
    { label: 'Single Choice', value: QuestionType.SINGLE_CHOICE },
    { label: 'Short Answer', value: QuestionType.SHORT_ANSWER },
    { label: 'True/ False', value: QuestionType.TRUE_FALSE }
  ];

  questionForm$ = this.questionForm.valueChanges.pipe(tap(vals => {
    this._formStateService.setQuestionForm(vals as QuestionInput)
    this._formStateService.setQuestionFormIsValid(this.questionForm.valid);
  }))

  isQuestionFormValid$ = this._formStateService.questionFormIsValid$.pipe(tap(isValid => {
    this.isQuestionFormValid = isValid;
  }))

  fetchedSubSection$: Observable<SubSection> = new Observable();
  fetchQuestionBeingEdited$: Observable<Question> = new Observable();
  subsections$: Observable<SubSection> = new Observable()
  nextOperation$: Observable<Question> = new Observable();

  isQuestionFormValid = false;
  subsectionId!: number;
  editMode = false;
  question!: Question;

  ngOnInit(): void {
    this._initialize()
  }

  private _initialize() {
    if (this._subsectionId) {
      this.fetchedSubSection$ = this._formStateService.getCurrentSubSectionBeingEdited(this._subsectionId)
      this.fetchQuestionBeingEdited$ = this.questionId ? this._formStateService.getCurrentQuestionBeingEdited(this.questionId) : of(null as any)

      combineLatest([this.fetchedSubSection$, this.fetchQuestionBeingEdited$]).pipe(tap(([subsection, question]) => {
        const subsectionId = subsection.id
        this.questionForm.get('subsectionId')?.patchValue(`${subsectionId}`);
        this.subsectionId = subsection.id;
        if (this.questionId) {
          this.editMode = true;
          this.questionForm.get('text')?.patchValue(`${question.text}`);
          this.questionForm.get('type')?.patchValue(`${question.type}`);
          this.question = question;
        }
      }), takeUntil(this.destroy$)).subscribe()
    }
  }

  submit() {
    const call$ = this.editMode ?  this._formStateService.updateQuestion(this.question, this.subsectionId) :  this._formStateService.createQuestion(this.subsectionId)
    this.nextOperation$ = call$.pipe(tap(res => {
      if (res.id) {
        this._router.navigate(['/questions']);
      }
    }));
  }

  cancel() {
    this._router.navigate(['/questions']);
  }

  ngOnDestroy() {
    this, this.destroy$.next(true)
  }


}
