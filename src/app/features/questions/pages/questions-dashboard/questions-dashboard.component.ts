import { Component, Inject } from '@angular/core';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { SectionSelectionComponent } from '../../components/section-selection/section-selection.component'
import { StepSelectionComponent } from '../../components/step-selection/step-selection.component';
import { QuestionFormComponent } from '../../components/question-form/question-form.component';
import { CommonModule } from '@angular/common';
import { Question, Section } from '../../../../shared/interfaces/questions.interface';
import {SharedModule} from "../../../../shared/shared.module";
import {NavbarComponent} from "../../../../core/components/navbar/navbar.component";

@Component({
  selector: 'app-questions-dashboard',
  standalone: true,
  imports: [SharedModule, NavbarComponent, SectionSelectionComponent, StepSelectionComponent, QuestionFormComponent, CommonModule],
  templateUrl: './questions-dashboard.component.html',
  styleUrl: './questions-dashboard.component.scss'
})
export class QuestionsDashboardComponent {
  selectedSection!:  Section;
  selectedStep: number | null = null;
  steps: number[] = [];

  sections:Section[] = [
    { name: 'Section 1', steps: [1, 2, 3] },
    { name: 'Section 2', steps: [1, 2] }
  ];

  constructor(@Inject(SESSION_STORAGE) private storage: WebStorageService) { }

  ngOnInit() {
    this.questions = this.storage.get('questions') || [];
    this.updateSteps();
  }

  onSectionSelected(sectionName: string) {
    this.selectedSection = this.sections.find(s => s['name'] === sectionName) as Section;
    this.selectedStep = null; // Reset selected step when section changes
    this.updateSteps();
  }

  onStepSelected(step: number) {
    this.selectedStep = step;
  }

  updateSteps() {
    this.steps = this.selectedSection?.['steps'] as [] ?? [];
  }

  questions: Question[] = [];
  displayedColumns: string[] = ['section', 'step', 'questionText', 'options'];

  addQuestion(question: Question) {
    this.questions.push(question);
  }

}
