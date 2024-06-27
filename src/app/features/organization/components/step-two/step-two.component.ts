import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharedModule } from '../../../../shared';
import { OrganizationOnboardService } from '../../services/organization-onboard.service';
import { tap } from 'rxjs';
import { CompanyInput, GrowthStage, RegistrationStructure } from '../../interfaces';

@Component({
  selector: 'app-step-two',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SharedModule],
  templateUrl: './step-two.component.html',
  styleUrl: './step-two.component.scss'
})
export class StepTwoComponent {

  private _fb = inject(FormBuilder)
  private _orgStateService = inject(OrganizationOnboardService);

  private _currentCompanyData: CompanyInput = this._orgStateService.companyInput;

  registrationStructures = Object.values(RegistrationStructure);
  growthStages = Object.values(GrowthStage);
  yearsOfOperation: string[] = [
    "0 Years",
    "0 - 1 years",
    "2 - 3 years",
    "3 - 5 years",
    "5 - 8 years",
    "More than 8 years"
  ];
  numberOfEmployees: string[] = [
    "1-10 employees",
    "11-50 employees",
    "51-200 employees",
    "201-500 employees",
    "501-1000 employees",
    "1001-5000 employees",
    "5001-10,000 employees",
    "10,001+ employees"
  ];
  stepTwoForm: FormGroup = this._fb.group({
    registrationStructure: [this._currentCompanyData.registrationStructure ?? '', Validators.required],
    yearsOfOperation: [this._currentCompanyData.yearsOfOperation ?? '', [Validators.required]],
    growthStage: [this._currentCompanyData.growthStage ?? '', Validators.required],
    numberOfEmployees: [this._currentCompanyData.numberOfEmployees ?? '', Validators.required],
    fullTimeBusiness: [this._currentCompanyData.fullTimeBusiness, Validators.required]
  });

  stepTwoForm$ = this.stepTwoForm.valueChanges.pipe(tap(vals => {
    this._orgStateService.step2isValid.set(this.stepTwoForm.valid)
    if (this.stepTwoForm.valid) {
      this._orgStateService.updateCompanyInput(vals);
    }
  }));

  fullTimeBusinessOptions = [
    { label: 'Yes, I run it full-time.', value: true },
    { label: 'No, I run it part-time.', value: false }
  ]

}
