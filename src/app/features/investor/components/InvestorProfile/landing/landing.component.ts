import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import {
  RegistrationStructure, EsgFocusAreaOptions, InvestmentStructureOptions, InvestorTypeOptions, BusinessGrowthStageOptions, UseOfFundsOptions
} from '../../../../../shared/interfaces/Investor';
import { ReactiveFormsModule } from '@angular/forms';
import { catchError, Observable, tap } from 'rxjs';
import { InvestorScreensService } from '../../../services/investor.screens.service';
import { of } from 'rxjs';
import { FeedbackService } from '../../../../../core';
import { CountriesService } from '../../../../../shared/services/countries.service';
import { Country } from '../../../../../shared/interfaces/countries';
import { SectorsService } from '../../../../sectors/services/sectors/sectors.service';
import { Sector,SubSector } from '../../../../../shared/interfaces/Investor';
import { Router } from '@angular/router';


@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, DropdownModule, MultiSelectModule, ReactiveFormsModule],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  private _formBuilder = inject(FormBuilder);
  private _httpClient = inject(HttpClient);
  private _feedbackService = inject(FeedbackService)
  private _screenService = inject(InvestorScreensService)
  private _countries = inject(CountriesService)
  private _sectorService = inject(SectorsService)
  private _router = inject(Router)

  current_details: number = 2
  cur_det : number[] = [1,2,3]
  submit$ = new Observable<unknown>()
  esgFocusAreaOptions: EsgFocusAreaOptions[] = []
  countryOptions: Country[] = []
  investmentStructureOptions: InvestmentStructureOptions[] = []
  registrationStructureOptions: RegistrationStructure[] = []
  investorTypeOptions: InvestorTypeOptions[] = []
  businessGrowthStageOptions: BusinessGrowthStageOptions[] = []
  useOfFundsOptions: UseOfFundsOptions[] = []
  userEmail: string = ''
  userId: number = 0
  sectors: Sector[] = []
  subSectors: SubSector[] = []

  selectedSectors: number[] = [];
  selectedSubSectors: number[] = [];

  sectorId: number = 0

  message: { title: string, message: string, type: 'info' | 'success' | 'warning' | 'error' } | null = null;

  formGroup!: FormGroup;
  message$ = new Observable<{ title: string, message: string, type: 'info' | 'success' | 'warning' | 'error' } | null>;


  ngOnInit(): void {
    const userProfileStr = sessionStorage.getItem('userProfile');
    const userId = sessionStorage.getItem('userId')

    if (userProfileStr) {
      const userProfile = JSON.parse(userProfileStr);
      this.userEmail = userProfile.username
    }

    if (userId) {
      const id = Number(userId)
      this.userId = id
    }


    this.message$ = this._feedbackService.message$;


    this.formGroup = this._formBuilder.group({
      userId: this.userId,
      headOfficeLocation: ['', Validators.required],
      organizationName: ['', Validators.required],
      fundDescription: ['', Validators.required],
      emailAddress: ['',Validators.required],
      url: ['', Validators.required],
      availableFunding: [null, Validators.required],
      differentFundingVehicles: ['', Validators.required],
      countriesOfInvestmentFocus: [[], Validators.required],
      useOfFunds: [[], Validators.required],
      minimumFunding: ['', Validators.required],
      maximumFunding: ['', Validators.required],
      businessGrowthStages: [[], Validators.required],
      investorType: ['', Validators.required],
      investmentStructures: [[], Validators.required],
      esgFocusAreas: [[], Validators.required],
      registrationStructures: [[], Validators.required],
      sectors: this.selectedSectors,
      subSectors: this.selectedSubSectors,

    });

  }



  onSubmit(): void {
    this.formGroup.value.sectors = this.selectedSectors
    this.formGroup.value.subSectors = this.selectedSubSectors

    if (this.formGroup.valid) {
      const formData = this.formGroup.value;
      this.submit$ = this._screenService.createInvestorProfile(formData).pipe(
        tap(res => {
          this._router.navigate(['/investor/contact-person']);
        }),
        catchError((error: any) => {
          this._feedbackService.error('Error Adding Investor Profile.', error);
          return of(null);
        }),
      )

    }
  }





  setNextDetails() {
    this.current_details = this.current_details + 1
  }

  setPrevDetails() {
    if (this.current_details != 1) {
      this.current_details = this.current_details - 1
    }
  }

  toggleSectorSelection(sectorId: number): void {
    const index = this.selectedSectors.indexOf(sectorId);
    if (index > -1) {
      this.selectedSectors.splice(index, 1);
    } else {
      this.selectedSectors.push(sectorId);
      console.log("The sectors are ", this.selectedSectors)
      this.loadSubSectors(sectorId); // Load sub-sectors for the newly selected sector
    }
  }

  toggleSubSectorSelection(subSectorId: number): void {
    const index = this.selectedSubSectors.indexOf(subSectorId);
    if (index > -1) {
      this.selectedSubSectors.splice(index, 1);
    } else {
      this.selectedSubSectors.push(subSectorId);
    }
  }

  isSectorSelected(sectorId: number): boolean {
    return this.selectedSectors.includes(sectorId);
  }

  isSubSectorSelected(subSectorId: number): boolean {
    return this.selectedSubSectors.includes(subSectorId);
  }


  loadSubSectors(sectorId: number): void {
    this.subSectors$ = this._sectorService.getSubSectorOfaSector(sectorId).pipe(tap(subSectors => {
      this.subSectors = subSectors
    }))
  }


  countries$ = this._countries.getCountries().pipe(tap(countries => {
    this.countryOptions = countries
  }))

  registrationStructureOptions$ = this._screenService.getRegistrationStructures().pipe(tap(registrationStructureOptions => {
    this.registrationStructureOptions = registrationStructureOptions
  }))


  useOfFundsOptions$ = this._screenService.getUseOfFunds().pipe(tap(useOfFunds => {
    this.useOfFundsOptions = useOfFunds
  }))


  businessGrowthStageOptions$ = this._screenService.getStages().pipe(tap(stages => {
    this.businessGrowthStageOptions = stages
  }))



  investmentStructureOptions$ = this._screenService.getInvestmentStructures().pipe(tap(structures => {
    this.investmentStructureOptions = structures
  }))


  esgFocusAreaOptions$ = this._screenService.getEsgFocusAreas().pipe(tap(structures => {
    this.esgFocusAreaOptions = structures
  }))

  sectors$ = this._sectorService.getAllSectors().pipe(tap(sectors => {
    this.sectors = sectors
  }))

  subSectors$ = this._sectorService.getSubSectorOfaSector(this.sectorId).pipe(tap(sectors => {
    this.subSectors = sectors
  }))

  investorProfile$ = this._screenService.getInvestorProfileById().pipe(tap(investorProfile =>{
    alert(investorProfile)
  }))

  // investorTypeOptions = [
  //   { name: 'Private equity', value: 'Private equity' },
  //   { name: 'Venture capital', value: 'Venture capital' }
  // ];


}
