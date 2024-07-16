import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharedModule } from '../../../../shared';
import { OrganizationOnboardService } from '../../services/organization-onboard.service';
import { tap } from 'rxjs';
import { CompanyInput, GrowthStage, NumberOfEmployees, RegistrationStructure, YearsOfOperation } from '../../interfaces';

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

  yearsOfOperation: YearsOfOperation[] = [
    YearsOfOperation.ZeroYears,
    YearsOfOperation.ZeroToOneYears,
    YearsOfOperation.TwoToThreeYears,
    YearsOfOperation.ThreeToFiveYears,
    YearsOfOperation.FiveToEightYears,
    YearsOfOperation.MoreThanEightYears
  ];
  numberOfEmployees: NumberOfEmployees[] = [
    NumberOfEmployees.OneToTen,
    NumberOfEmployees.ElevenToFifty,
    NumberOfEmployees.FiftyOneToTwoHundred,
    NumberOfEmployees.TwoHundredOneToFiveHundred,
    NumberOfEmployees.FiveHundredOneToThousand,
    NumberOfEmployees.ThousandOneToFiveThousand,
    NumberOfEmployees.FiveThousandOneToTenThousand,
    NumberOfEmployees.TenThousandPlus
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
  }))

}
