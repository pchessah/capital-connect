import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { InvestorProfileDetails } from '../../services/investor.profile.service';
import { tap } from 'rxjs';
import { NavbarComponent } from '../../../../core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InvestorProfile } from '../../../../shared/interfaces/InvestorProfile';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';



@Component({
  selector: 'app-investor-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent, ModalComponent],
  templateUrl: './investor-profile.component.html',
  styleUrls: ['./investor-profile.component.scss']
})
export class InvestorProfileComponent {
  private _investorProfileService = inject(InvestorProfileDetails);

  investorProfiles: InvestorProfile[] = [];
  investorProfile: InvestorProfile | null = null;

  selectedProfile: InvestorProfile | null = null;
  newProfile: InvestorProfile = {} as InvestorProfile;
  visible = false;
  editMode: boolean = false




  investorProfiles$ = this._investorProfileService.getAllInvestorProfiles().pipe(tap(profiles => this.investorProfiles = profiles))


  viewProfile(userId: number) {
    // investorProfile$ = this._investorProfileService.getInvestorProfileById(1).pipe(tap(profiles => this.investorProfile = profiles))

    this.visible = true
    this.investorProfile = {
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

    }
  }


  showDialog() {
    this.visible = true;
    this.selectedProfile = null;
  }

  selectProfile(profile: InvestorProfile) {
    this.selectedProfile = profile;
    this.visible = true;
  }

  // saveProfile() {
  //   createInvestorProfile$ = this._investorProfileService.createInvestorProfile({}).pipe(tap());

  //   if (this.selectedProfile) {
  //     this._investorProfileService.updateInvestorProfileById(this.selectedProfile.userId, this.selectedProfile)

  //   } else {
  //     this._investorProfileService.createInvestorProfile(this.newProfile)

  //   }
  // }

  // updateProfile() {
  //   updateInvestorProfile$ = this._investorProfileService.updateInvestorProfileById({}).pipe();

  // }

  // deleteProfile(id: number) {
  //   deleteInvestorProfile$ = this._investorProfileService.deleteInvestorProfileById(1).pipe();

  //   this._investorProfileService.deleteInvestorProfileById(id)
  //   // .subscribe(() => this.loadInvestorProfiles());
  // }

  cancel() {
    this.visible = false;
    this.newProfile = {} as InvestorProfile;
  }


  toggleEditMode() {
    this.editMode = !this.editMode;
  }
}
