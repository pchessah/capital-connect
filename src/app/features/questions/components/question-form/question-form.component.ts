import { Component, inject, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharedModule } from '../../../../shared';
import { CommonModule } from '@angular/common';
import { FormStateService } from '../../services/form-state/form-state.service';
import { tap } from 'rxjs';

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

  questionForm = this._fb.group({
    questions: this._fb.array([])
  });
  questionTypes: string[] = ['MULTIPLE_CHOICE', 'SINGLE_CHOICE', 'TRUE_FALSE', 'SHORT_ANSWER'];

  questionForm$ = this.questionForm.valueChanges.pipe(tap(form => {
    
  }))


  ngOnInit() {
    this._formStateService.setQuestionForm(this.questionForm);
  }

  get questions(): FormArray {
    return this.questionForm.get('questions') as FormArray;
  }

  addQuestion() {
    const questionGroup = this._fb.group({
      text: ['', Validators.required],
      type: ['', Validators.required],
      options: this._fb.array([])
    });
    this.questions.push(questionGroup);
  }

  addOption(questionIndex: number) {
    const options = this.getOptions(questionIndex);
    options.push(this._fb.control('', Validators.required));
  }

  getOptions(questionIndex: number): FormArray {
    return this.questions.at(questionIndex).get('options') as FormArray;
  }

  removeQuestion(index: number) {
    this.questions.removeAt(index);
  }

  questionTypeChange(questionIndex: number) {
    const type = this.questions.at(questionIndex).get('type')?.value;
    const options = this.getOptions(questionIndex);
    while (options.length) {
      options.removeAt(0);
    }
    if (type === 'MULTIPLE_CHOICE' || type === 'SINGLE_CHOICE') {
      options.push(this._fb.control('', Validators.required));
    } else if (type === 'TRUE_FALSE') {
      options.push(this._fb.control('True', Validators.required));
      options.push(this._fb.control('False', Validators.required));
    }
  }


}
