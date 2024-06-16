import { Component, inject, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharedModule } from '../../../../shared';
import { CommonModule } from '@angular/common';
import { FormStateService } from '../../services/form-state/form-state.service';

@Component({
  selector: 'app-question-form',
  standalone: true,
  imports: [ReactiveFormsModule, SharedModule, CommonModule],
  templateUrl: './question-form.component.html',
  styleUrl: './question-form.component.scss'
})
export class QuestionFormComponent {
  questionForm: FormGroup;
  questionTypes: string[] = ['MULTIPLE_CHOICE', 'SINGLE_CHOICE', 'TRUE_FALSE', 'SHORT_ANSWER'];

  constructor(private fb: FormBuilder, private formStateService: FormStateService) {
    this.questionForm = this.fb.group({
      questions: this.fb.array([])
    });
  }

  ngOnInit() {
    this.formStateService.setQuestionForm(this.questionForm);
  }

  get questions(): FormArray {
    return this.questionForm.get('questions') as FormArray;
  }

  addQuestion() {
    const questionGroup = this.fb.group({
      text: ['', Validators.required],
      type: ['', Validators.required],
      options: this.fb.array([])
    });
    this.questions.push(questionGroup);
  }

  addOption(questionIndex: number) {
    const options = this.getOptions(questionIndex);
    options.push(this.fb.control('', Validators.required));
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
      options.push(this.fb.control('', Validators.required));
    } else if (type === 'TRUE_FALSE') {
      options.push(this.fb.control('True', Validators.required));
      options.push(this.fb.control('False', Validators.required));
    }
  }
  

}
