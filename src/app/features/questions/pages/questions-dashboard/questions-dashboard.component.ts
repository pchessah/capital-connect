import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionFormComponent } from '../../components/question-form/question-form.component';
import { NavbarComponent } from "../../../../core";
import { SharedModule } from '../../../../shared';
import { MatStepper } from '@angular/material/stepper';
import { FormStateService } from '../../services/form-state/form-state.service';
import { SubSectionFormComponent } from '../../components/sub-section-form/sub-section-form.component';
import { SectionFormComponent } from '../../components/section-form/section-form.component';

@Component({
  selector: 'app-questions-dashboard',
  standalone: true,
  imports: [SharedModule, NavbarComponent, QuestionFormComponent, SectionFormComponent, CommonModule, SubSectionFormComponent],
  templateUrl: './questions-dashboard.component.html',
  styleUrl: './questions-dashboard.component.scss'
})
export class QuestionsDashboardComponent {
  
  @ViewChild('stepper') private stepper!: MatStepper;

  constructor(private formStateService: FormStateService) { }

  ngOnInit() { }

  nextStep() {
    const currentStepIndex = this.stepper.selectedIndex;
    let formValid = false;

    if (currentStepIndex === 0) {
      this.formStateService.getSectionForm().subscribe(form => formValid = form?.valid || false);
    } else if (currentStepIndex === 1) {
      this.formStateService.getSubsectionForm().subscribe(form => formValid = form?.valid || false);
    } else if (currentStepIndex === 2) {
      this.formStateService.getQuestionForm().subscribe(form => formValid = form?.valid || false);
    }

    if (formValid) {
      this.stepper.next();
    }
  }

  prevStep() {
    this.stepper.previous();
  }

 

}
