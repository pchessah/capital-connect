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
  yearsOfOperation: number[] = Array.from({ length: 51 }, (_, i) => i); // 0 to 50 years
  numberOfEmployees: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50];

  stepTwoForm: FormGroup = this._fb.group({
    registrationStructure: [ this._currentCompanyData.registrationStructure ?? '', Validators.required],
    yearsOfOperation: [ this._currentCompanyData.yearsOfOperation ?? '', [Validators.min(1), Validators.required]],
    growthStage: [ this._currentCompanyData.growthStage ?? '', Validators.required],
    numberOfEmployees: [this._currentCompanyData.numberOfEmployees ?? '', Validators.required],
    fullTimeBusiness: [this._currentCompanyData.fullTimeBusiness , Validators.required]
  });

  stepTwoForm$ = this.stepTwoForm.valueChanges.pipe(tap(vals => {
    this._orgStateService.step2isValid.set(this.stepTwoForm.valid)
    if (this.stepTwoForm.valid) {
      this._orgStateService.updateCompanyInput(vals);
    }
  }))

}
