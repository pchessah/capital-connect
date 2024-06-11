import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharedModule } from '../../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { Question, Section } from '../../../../shared/interfaces/questions.interface';

@Component({
  selector: 'app-question-form',
  standalone: true,
  imports: [ReactiveFormsModule, SharedModule, CommonModule],
  templateUrl: './question-form.component.html',
  styleUrl: './question-form.component.scss'
})
export class QuestionFormComponent {
  @Input() currentStep: number | null = null;
  @Input() currentSection!: Section;
  @Output() questionCreated = new EventEmitter<Question>();

  private fb = inject(FormBuilder);
  questionForm!: FormGroup;

  constructor() {
    this.questionForm = this.fb.group({
      questionText: ['', Validators.required],
      options: this.fb.array([this.createOption()])
    });
  }

  addOption() {
    (this.questionForm.get('options') as FormArray).push(this.createOption());
  }

  get questionText() {
    return this.questionForm.get('questionText')!;
  }

  get options() {
    return this.questionForm.get('options') as FormArray;
  }

  createOption(): FormGroup {
    return this.fb.group({
      text: ['', Validators.required]
    });
  }

  removeOption(index: number) {
    this.options.removeAt(index);
  }

  onSubmit() {
    if (this.questionForm.valid) {
      const question: Question = {
        section: this.currentSection?.name || '',
        step: this.currentStep || 0,             
        questionText: this.questionForm.value.questionText,
        options: this.questionForm.value.options.map((opt: { text: string }) => opt.text)
      };

      this.questionCreated.emit(question);

      this.questionForm.reset();
      while (this.options.length > 1) {
        this.options.removeAt(1); // Keep one default option
      }
    }
  }
}
