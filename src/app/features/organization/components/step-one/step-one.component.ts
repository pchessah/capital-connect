import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { SharedModule } from '../../../../shared';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, tap } from 'rxjs';
import { OrganizationOnboardService } from '../../services/organization-onboard.service';
import { Company, CompanyInput } from '../../interfaces';
import { UserCompanyService } from "../../../../core/services/company/user.company.service";
import { Sector, SubSector } from '../../../sectors/interfaces';

@Component({
  selector: 'app-step-one',
  standalone: true,
  imports: [CommonModule, SharedModule, ReactiveFormsModule],
  templateUrl: './step-one.component.html',
  styleUrl: './step-one.component.scss'
})
export class StepOneComponent {
  private _userCompany = inject(UserCompanyService)
  private _fb = inject(FormBuilder)
  private _orgStateService = inject(OrganizationOnboardService);

  sectors$: Observable<Sector[]> = this._orgStateService.fetchSectors$.pipe(tap(sectors => { 
    this.sectors = sectors;
    this.businessSubsectorCtrl?.disable();
    this.businessSubsectorCtrl?.reset();
  }));
  subsectors$!: Observable<SubSector[]>

  private _currentCompanyData: CompanyInput = this._orgStateService.companyInput;
  userCompany!: Company;

  stepOneForm: FormGroup = this._fb.group({
    name: [this._currentCompanyData.name ?? '', Validators.required],
    country: [this._currentCompanyData.country ?? 'Kenya', Validators.required],
    businessSector: [this._currentCompanyData.businessSector ?? '', Validators.required],
    businessSubsector: [this._currentCompanyData.businessSubsector ?? '', Validators.required],
    productsAndServices: [this._currentCompanyData.productsAndServices ?? '', Validators.required]
  });

  stepOneForm$ = this.stepOneForm.valueChanges.pipe(tap(vals => {
    this._orgStateService.step1isValid.set(this.stepOneForm.valid)
    if (this.stepOneForm.valid) {
      this._orgStateService.updateCompanyInput(vals)
    }
  }))

  onSectorSelected(target: EventTarget | null) {
    this.businessSubsectorCtrl?.reset();
    this.businessSubsectorCtrl?.enable();
    const sectorId = Number(this.sectors.find(sector => sector.name === (target as any).value)?.id) as number;
    this.subsectors$ = this._orgStateService.fetchSpecificSubSectors(sectorId).pipe(tap(subsectors => {
      this.subsectors = subsectors
    }))
  }

  get businessSubsectorCtrl() {
    return this.stepOneForm.get('businessSubsector')
  }

  countries = [
    "Algeria",
    "Angola",
    "Benin",
    "Botswana",
    "Burundi",
    "Cabo Verde",
    "Cameroon",
    "Central African Republic (CAR)",
    "Chad",
    "Comoros",
    "Congo, Democratic Republic of the",
    "Congo, Republic of the",
    "Cote d’Ivoire",
    "Djibouti",
    "Egypt",
    "Equatorial Guinea",
    "Eritrea",
    "Eswatini",
    "Ethiopia",
    "Gabon",
    "Gambia",
    "Ghana",
    "Guinea",
    "Guinea-Bissau",
    "Kenya",
    "Lesotho",
    "Liberia",
    "Libya",
    "Madagascar",
    "Malawi",
    "Mali",
    "Mauritania",
    "Mauritius",
    "Morocco",
    "Mozambique",
    "Namibia",
    "Niger",
    "Nigeria",
    "Rwanda",
    "Sao Tome and Principe",
    "Senegal",
    "Seychelles",
    "Sierra Leone",
    "Somalia",
    "South Africa",
    "South Sudan",
    "Sudan",
    "Tanzania",
    "Togo",
    "Tunisia",
    "Uganda",
    "Zambia",
    "Zimbabwe",
    "Other"
  ];

  sectors: Sector[] = [];
  subsectors: SubSector[] = [];


  productsAndServices: string[] = ['FMCG', 'Fintech', 'Software', 'Consulting', 'Logistics', 'Telecommunications', 'Biotechnology', 'Construction', 'Energy', 'Tourism'];

  company$ = this._userCompany.companySrc$.pipe(tap(company => {
    this.userCompany = company;
  }))
}
