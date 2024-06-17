import { Component, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatStepper } from '@angular/material/stepper';
import { Observable, tap } from 'rxjs';
import { QuestionFormComponent } from '../../components/question-form/question-form.component';
import { NavbarComponent } from "../../../../core";
import { SharedModule } from '../../../../shared';
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

  private _formStateService = inject(FormStateService);
  nextOperation$ = new Observable<unknown>();

  @ViewChild('stepper') private stepper!: MatStepper;

  isSectionFormValid$ = this._formStateService.sectionFormIsValid$.pipe(tap(isValid => {
    this.isSectionFormValid = isValid;
  }))

  isSubsectionFormValid$ = this._formStateService.subsectionFormIsValid$.pipe(tap(isValid => {
    this.isSubsectionFormValid = isValid;
  }))

  isQuestionFormValid$ = this._formStateService.questionForm$.pipe(tap(form => {
    this.isQuestionFormValid = form?.valid as boolean
  }))

  isQuestionFormValid = false;
  isSubsectionFormValid = false;
  isSectionFormValid =  false;

  nextStep(form: 'section-form' | 'question-form' | 'subsection-form') {
    switch(form){
      case 'section-form':
        this.nextOperation$ = this._formStateService.createSection().pipe(tap(res => {
          this.stepper.next();
        }));
        break;
      case 'subsection-form' :
        this.nextOperation$ = this._formStateService.createSubsection().pipe(tap(res => {
          this.stepper.next();
          debugger
        }));
        break;
    }
  }

  prevStep() {
    this.stepper.previous();
  }

  isNextButtonDisabled() {
    return false
  }


}
