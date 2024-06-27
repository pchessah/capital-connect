import { inject, Injectable, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { CompanyInput, GrowthStage, RegistrationStructure } from '../interfaces';
import { CompanyHttpService } from './company.service';
import { of, switchMap, tap } from 'rxjs';
import { FeedbackService, UploadService } from '../../../core';
import { AuthStateService } from '../../auth/services/auth-state.service';
import { CompanyStateService } from './company-state.service';

@Injectable({providedIn: 'root'})
export class OrganizationOnboardService {

  private _feedbackService = inject(FeedbackService);
  private _companyService = inject(CompanyHttpService)
  private _authStateService = inject(AuthStateService);
  private _uploadService = inject(UploadService);
  private _companyStateService = inject(CompanyStateService);

  step1isValid = signal<boolean>(false);
  step2isValid = signal<boolean>(false);
  step3isValid = signal<boolean>(false);
  step4isValid = signal<boolean>(false);

  companyLogoToUpload = signal<File>(null as any)

  private _companyInput = signal<CompanyInput>({
    name: '',
    country: '',
    businessSector: '',
    productsAndServices: '',
    registrationStructure: RegistrationStructure.CoOperative,
    yearsOfOperation:   "0 - 10" ,
    growthStage: GrowthStage.SeedStartUpIdea,
    numberOfEmployees: '1-10 employees',
    fullTimeBusiness: false
  });

  companyInput$ = toObservable(this._companyInput)

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
      registrationStructure: RegistrationStructure.CoOperative,
      yearsOfOperation: '0 - 10',
      growthStage: GrowthStage.SeedStartUpIdea,
      numberOfEmployees: '1-10 employees',
      fullTimeBusiness: false
    });
  }
  

  submitCompanyInfo() {
    return this._companyService.createCompany(this.companyInput).pipe(
      switchMap(() => {
        if(this.companyLogoToUpload()){
          const file = this.companyLogoToUpload()
          return this._uploadService.uploadFile(file)
        }
        return of(true) //Always return an observable to satisfy conditions of switchmap
      }),
      tap((res) => {
        debugger
      this._feedbackService.success('Company created successfully.')
    }))
  }

  getCompanyOfUser(){
    const currentUserId = this._authStateService.currentUserId();
    return this._companyService.getCompanyOfUser(currentUserId).pipe(tap(company =>{
      //Add fn to fecth logo
      debugger
      this._companyInput.set(company);
      this._companyStateService.setCompany(company);
    }))
  }

}
