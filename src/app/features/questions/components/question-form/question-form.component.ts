import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharedModule } from '../../../../shared';
import { CommonModule } from '@angular/common';
import { FormStateService } from '../../services/form-state/form-state.service';
import { Observable, tap } from 'rxjs';
import { Question, QuestionInput, QuestionType, SubSection } from '../../interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question-form',
  standalone: true,
  imports: [ReactiveFormsModule, SharedModule, CommonModule],
  templateUrl: './question-form.component.html',
  styleUrl: './question-form.component.scss'
})
export class QuestionFormComponent {

  private _fb = inject(FormBuilder)
  private _formStateService = inject(FormStateService)
  private _router = inject(Router)

  questionForm = this._fb.group({
    subsection: ['', Validators.required],
    question: ['', Validators.required],
    questionType: ['', Validators.required]
  });

  subsections$:Observable<SubSection> = this.getSubsections()

  questionTypes: { label: string, value: QuestionType}[] = [
    { label: 'Multiple Choice', value: QuestionType.MULTIPLE_CHOICE },
    { label: 'Single Choice', value: QuestionType.SINGLE_CHOICE },
    { label: 'Short Answer', value: QuestionType.SHORT_ANSWER },
    { label: 'True/ False', value: QuestionType.TRUE_FALSE }
  ];

  questionForm$ = this.questionForm.valueChanges.pipe(tap(vals => {
    this._formStateService.setQuestionForm(vals as QuestionInput)
    this._formStateService.setQuestionFormIsValid(this.questionForm.valid)
  }))


  nextOperation$: Observable<Question> = new Observable();


  onSubmit() {
    this.nextOperation$ = this._formStateService.createQuestion().pipe(tap(res => {
      if(res.id){

        //TOD0 @meltus create route for this in routing component
        this._router.navigate(['/questions/single-question'], { state: { sectionId: res.id }});
      }
     }));
  }

  getSubsections(): Observable<SubSection> {
    const currentSubSectionThatNeedsQuestion = this._formStateService.getCurrentSubSectionBeingEdited()
    return currentSubSectionThatNeedsQuestion  as Observable<SubSection>
  }


}
