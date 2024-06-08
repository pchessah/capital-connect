import { Component } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { NavbarComponent } from '../../../../core/navbar/navbar.component';
import { SectionSelectionComponent } from '../../components/section-selection/section-selection.component'
import { StepSelectionComponent } from '../../components/step-selection/step-selection.component';
import { QuestionFormComponent } from '../../components/question-form/question-form.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-questions-dashboard',
  standalone: true,
  imports: [SharedModule, NavbarComponent, SectionSelectionComponent, StepSelectionComponent, QuestionFormComponent, CommonModule],
  templateUrl: './questions-dashboard.component.html',
  styleUrl: './questions-dashboard.component.scss'
})
export class QuestionsDashboardComponent {
  selectedSection:  { name: string; steps: number[] } | null  = null;
  selectedStep: number | null = null;
  steps: number[] = [];

  sections:{ name: string; steps: number[] } [] = [
    { name: 'Section 1', steps: [1, 2, 3] },
    { name: 'Section 2', steps: [1, 2] }
  ];

  ngOnInit() {
    // Set the initial section (optional)
    this.selectedSection = this.sections[0]; 
    this.updateSteps();
  }

  onSectionSelected(sectionName: string) {
    this.selectedSection = this.sections.find(s => s['name'] === sectionName) ?? null;
    this.selectedStep = null; // Reset selected step when section changes
    this.updateSteps();
  }

  onStepSelected(step: number) {
    this.selectedStep = step;
  }

  updateSteps() {
    this.steps = this.selectedSection?.['steps'] as [] ?? [];
  }

}
