import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { User } from '../../../users/models';
import { OrganizationInfoContainerComponent } from "../organization-info-container/organization-info-container.component";
import { Observable, tap } from 'rxjs';
import { SubmissionService, UserSubmissionResponse } from '../../../../shared';
import { BUSINESS_INFORMATION_SUBSECTION_IDS, getInvestorEligibilitySubsectionIds, INVESTOR_PREPAREDNESS_SUBSECTION_IDS } from '../../../../shared/business/services/onboarding.questions.service';
import { Company, CompanyResponse } from '../../interfaces';

@Component({
  selector: 'app-organization-submissions-info',
  standalone: true,
  imports: [CommonModule, OrganizationInfoContainerComponent],
  templateUrl: './organization-submissions-info.component.html',
  styleUrl: './organization-submissions-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class OrganizationSubmissionsInfoComponent implements OnChanges {
  owner!: User;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['company'] && changes['company'].currentValue) {
      this.company = changes['company'].currentValue;
      this.owner = this.company.user

      this.investorEligilityResponses$ = this._userSubmissionsService.fetchSubmissionsByUserPerSection(this.owner.id, getInvestorEligibilitySubsectionIds(this.company.growthStage).ID).pipe(tap(res => {
        debugger
      })) 
      
      this.businessResponses$ = this._userSubmissionsService.fetchSubmissionsByUserPerSection(this.owner.id, BUSINESS_INFORMATION_SUBSECTION_IDS.ID).pipe(tap(res => {
        debugger
      })) 
      
      this. investorPreparednessResponses$ = this._userSubmissionsService.fetchSubmissionsByUserPerSection(this.owner.id, INVESTOR_PREPAREDNESS_SUBSECTION_IDS.ID).pipe(tap(res => {
        debugger
      })) 
    }
  }

  @Input({ required: true}) company!: CompanyResponse


  private _userSubmissionsService = inject(SubmissionService);

  submissions$: Observable<UserSubmissionResponse[]> = new Observable();

  investorEligilityResponses$: Observable<UserSubmissionResponse[]> = new Observable();
  businessResponses$:Observable<UserSubmissionResponse[]> = new Observable();
  investorPreparednessResponses$:Observable<UserSubmissionResponse[]> = new Observable();

}
