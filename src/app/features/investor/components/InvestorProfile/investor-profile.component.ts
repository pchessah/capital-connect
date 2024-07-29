import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { InvestorProfileDetails } from '../../services/investor.profile.service';
import { Observable, tap, catchError, of } from 'rxjs';
import { NavbarComponent } from '../../../../core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InvestorProfile } from '../../../../shared/interfaces/InvestorProfile';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { FeedbackService } from '../../../../core';
import { ConfirmationDialogComponent } from '../../../../core/components/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';




@Component({
  selector: 'app-investor-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent,
    ReactiveFormsModule, DropdownModule, MultiSelectModule, ModalComponent],
  templateUrl: './investor-profile.component.html',
  styleUrls: ['./investor-profile.component.scss']
})
export class InvestorProfileComponent {
  private _feedbackService = inject(FeedbackService)
  private _investorProfileService = inject(InvestorProfileDetails);
  private _formBuilder = inject(FormBuilder)
  message$ = new Observable<{ title: string, message: string, type: 'info' | 'success' | 'warning' | 'error' } | null>;
  formGroup: FormGroup = this._formBuilder.group({})
  investorProfile$ = new Observable<InvestorProfile>();
  updateInvestorProfile$ = new Observable<unknown>();
  createInvestorProfile$ = new Observable<unknown>();
  deleteInvestorProfile$ = new Observable<unknown>();


  constructor(
    private dialog: MatDialog
  ) {}

  investorProfiles: InvestorProfile[] = [];
  investorProfile: InvestorProfile | null = {
    userId: 1,
    organizationName: "Test Name",
    countriesOfInvestmentFocus: ["Kenya", "Namibia", "Sudan"],
    headOfficeLocation: "NewYork",
    emailAddress: "otitrevor450@gmail.com",
    contactPerson: "Trevor Ogina",
    useOfFunds: ["Accounting", "Finance", "Sales", "Tech", "Customer Service"],
    maximumFunding: 120909090090,
    minimumFunding: 93092092,
    sectorsOfInvestment: ["Agriculture", "Engineering", "Health"],
    businessGrowthStages: ["Beginer", "Amateur", "Experienced"],
    investorType: "Personal",
    investmentStructures: ["Structure 1", "Structure 2"],
    esgFocusAreas: ["Test", "Focus", "Area"],
    registrationStructures: ["Test", "Focus", "Area"],

  };

  selectedProfile: InvestorProfile | null = null;
  newProfile: InvestorProfile = {} as InvestorProfile;
  visible = false;
  create_visible = false;
  editMode: boolean = false


  ngOnInit(): void {
    this.message$ = this._feedbackService.message$;
    this.formGroup = this._formBuilder.group({
      organizationName: [this.investorProfile?.organizationName, Validators.required],
      countriesOfInvestmentFocus: [this.investorProfile?.countriesOfInvestmentFocus, Validators.required],
      headOfficeLocation: [this.investorProfile?.headOfficeLocation, Validators.required],
      emailAddress: [this.investorProfile?.emailAddress, [Validators.required, Validators.email]],
      contactPerson: [this.investorProfile?.contactPerson, Validators.required],
      useOfFunds: [this.investorProfile?.useOfFunds, Validators.required],
      maximumFunding: [this.investorProfile?.maximumFunding, Validators.required],
      minimumFunding: [this.investorProfile?.minimumFunding, Validators.required],
      sectorsOfInvestment: [this.investorProfile?.sectorsOfInvestment, Validators.required],
      businessGrowthStages: [this.investorProfile?.businessGrowthStages, Validators.required],
      investorType: [this.investorProfile?.investorType, Validators.required],
      investmentStructures: [this.investorProfile?.investmentStructures, Validators.required],
      esgFocusAreas: [this.investorProfile?.esgFocusAreas, Validators.required],
      registrationStructures: [this.investorProfile?.registrationStructures, Validators.required]
    });
  }


  updateFormGroup() {
    if (this.investorProfile) {
      this.formGroup.patchValue({
        organizationName: this.investorProfile.organizationName,
        countriesOfInvestmentFocus: this.investorProfile.countriesOfInvestmentFocus,
        headOfficeLocation: this.investorProfile.headOfficeLocation,
        emailAddress: this.investorProfile.emailAddress,
        contactPerson: this.investorProfile.contactPerson,
        useOfFunds: this.investorProfile.useOfFunds,
        maximumFunding: this.investorProfile.maximumFunding,
        minimumFunding: this.investorProfile.minimumFunding,
        sectorsOfInvestment: this.investorProfile.sectorsOfInvestment,
        businessGrowthStages: this.investorProfile.businessGrowthStages,
        investorType: this.investorProfile.investorType,
        investmentStructures: this.investorProfile.investmentStructures,
        esgFocusAreas: this.investorProfile.esgFocusAreas,
        registrationStructures: this.investorProfile.registrationStructures
      });
    }
  }



  investorProfiles$ = this._investorProfileService.getAllInvestorProfiles().pipe(tap(profiles => this.investorProfiles = profiles))


  viewProfile(userId: number) {
    this.investorProfile$ = this._investorProfileService.getInvestorProfileById(userId).pipe(tap(
      profile => this.investorProfile = profile
    )), catchError((error: any) => {
      this._feedbackService.error('Error Getting Investor Profile', error);
      return of(null);
    }),
      this.visible = !this.visible
  }


  updateProfile(userId: number) {
    if (this.formGroup.valid) {
      const investorProfile = this.formGroup.value;
      this.updateInvestorProfile$ = this._investorProfileService.updateInvestorProfileById(userId, investorProfile).pipe(
        tap(() => {
          this._feedbackService.success('Investor Profile Updated Successfully');
        }),
        catchError((error: any) => {
          this._feedbackService.error('Error Updating Investor Profile', error);
          return of(null);
        })
      );
    }

  }



  saveProfile() {
    if (this.formGroup.valid) {
      const investorProfile = this.formGroup.value;
      this.createInvestorProfile$ = this._investorProfileService.createInvestorProfile(investorProfile).pipe(
        tap(() => {
          this._feedbackService.success('Investor Profile Created Successfully');
        }),
        catchError((error: any) => {
          this._feedbackService.error('Error Saving Investor Profile', error);
          return of(null);
        })
      );
    }
  }


  openConfirmationDialog(userId: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { message: 'Are you sure you want to delete this profile?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteProfile(userId);
      }
    });
  }


  deleteProfile(userId: number) {
    this.deleteInvestorProfile$ = this._investorProfileService.deleteInvestorProfileById(userId).pipe()
      , catchError((error: any) => {
        this._feedbackService.error('Error Deleting Investor Profile', error);
        return of(null);
      });
  }

  cancel() {
    this.visible = !this.visible;
    this.newProfile = {} as InvestorProfile;
  }

  cancelCreate() {
    this.create_visible = !this.create_visible
  }
  
  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  handleSubmit(): void {
    if (this.formGroup.valid) {
      const investorProfile: InvestorProfile = this.formGroup.value;
      console.log(investorProfile);
    }
  }

  createProfile() {
    this.create_visible = !this.create_visible
  }








  countries = [
    { text: 'Kenya', id: 'Kenya' },
    { text: 'Namibia', id: 'Namibia' },
    { text: 'Sudan', id: 'Sudan' }
  ];
  useOfFunds = [
    { text: 'Accounting', id: 'Accounting' },
    { text: 'Finance', id: 'Finance' },
    { text: 'Sales', id: 'Sales' },
    { text: 'Tech', id: 'Tech' },
    { text: 'Customer Service', id: 'Customer Service' }
  ];
  sectorsOfInvestment = [
    { text: 'Agriculture', id: 'Agriculture' },
    { text: 'Engineering', id: 'Engineering' },
    { text: 'Health', id: 'Health' }
  ];
  businessGrowthStages = [
    { text: 'Beginner', id: 'Beginner' },
    { text: 'Amateur', id: 'Amateur' },
    { text: 'Experienced', id: 'Experienced' }
  ];
  investmentStructures = [
    { text: 'Structure 1', id: 'Structure 1' },
    { text: 'Structure 2', id: 'Structure 2' }
  ];
  esgFocusAreas = [
    { text: 'Test', id: 'Test' },
    { text: 'Focus', id: 'Focus' },
    { text: 'Area', id: 'Area' }
  ];
  registrationStructures = [
    { text: 'Test', id: 'Test' },
    { text: 'Focus', id: 'Focus' },
    { text: 'Area', id: 'Area' }
  ];
}
