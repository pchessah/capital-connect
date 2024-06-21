import { inject, Injectable, signal } from '@angular/core';
import { CompanyInput, GrowthStage, RegistrationStructure } from '../interfaces';
import { CompanyHttpService } from './company.service';
import { tap } from 'rxjs';
import { FeedbackService } from '../../../core';

@Injectable({providedIn: 'root'})
export class OrganizationOnboardService {

  private _companyService = inject(CompanyHttpService)
  private _feedbackService = inject(FeedbackService);
  
  step1isValid = signal<boolean>(false);
  step2isValid = signal<boolean>(false);
  step3isValid = signal<boolean>(false);
  step4isValid = signal<boolean>(false);

  private _companyInput = signal<CompanyInput>({
    name: '',
    country: '',
    businessSector: '',
    productsAndServices: '',
    registrationStructure: RegistrationStructure.B2B,
    yearsOfOperation: 0,
    growthStage: GrowthStage.Seed,
    numberOfEmployees: 0,
    fullTimeBusiness: false
  });

  get companyInput() {
    return this._companyInput();
  }

  updateCompanyInput(update: Partial<CompanyInput>) {
    this._companyInput.set({
      ...this._companyInput(),
      ...update
    });
  }

  resetCompanyInput() {
    this._companyInput.set({
      name: '',
      country: '',
      businessSector: '',
      productsAndServices: '',
      registrationStructure: RegistrationStructure.B2B,
      yearsOfOperation: 0,
      growthStage: GrowthStage.Seed,
      numberOfEmployees: 0,
      fullTimeBusiness: false
    });
  }

  submitCompanyInfo() {
    return this._companyService.createCompany(this.companyInput).pipe(tap(res => {
      this._feedbackService.success('Company created successfully.')
    }))
  }
  
}