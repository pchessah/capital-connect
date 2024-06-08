import { Component, inject, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharedModule } from '../../../../shared/shared.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-question-form',
  standalone: true,
  imports: [ReactiveFormsModule, SharedModule, CommonModule],
  templateUrl: './question-form.component.html',
  styleUrl: './question-form.component.scss'
})
export class QuestionFormComponent {
  @Input() currentStep: number | null = null;
  @Input() currentSection: { name: string; steps: number[] } | null = null;

  private fb = inject(FormBuilder);
  questionForm!: FormGroup;

  constructor() {
    this.questionForm = this.fb.group({
      questionText: ['', Validators.required],
      options: this.fb.array([this.createOption()])
    });
  }


  // --- Rest of the component logic ---

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

  addOption() {
    this.options.push(this.createOption());
  }

  removeOption(index: number) {
    this.options.removeAt(index);
  }

  onSubmit() {
    if (this.questionForm.valid) {
      // Process the question data (e.g., send to a backend service)
      console.log(this.questionForm.value);

      // Reset the form for the next question
      this.questionForm.reset();
      while (this.options.length > 1) {
        this.options.removeAt(1); // Keep one default option
      }
    }
  }
}
