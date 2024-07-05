import { Component, inject } from '@angular/core';
import { OverviewSectionComponent } from "../../../../../shared/components/overview-section/overview-section.component";
import { CardComponent } from "../../../../../shared/components/card/card.component";
import { PhotoCollageComponent } from "../photo-collage/photo-collage.component";
import { tap } from "rxjs";
import { CommonModule } from "@angular/common";
import { ModalComponent } from "../../../../../shared/components/modal/modal.component";
import { CompanyStateService } from "../../../../organization/services/company-state.service";
import {BusinessOnboardingScoringService} from "../../../../../shared/services/business.onboarding.scoring.service";
import {MatchedInvestor} from "../../../../../shared/interfaces";

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [
    OverviewSectionComponent,
    CardComponent,
    PhotoCollageComponent,
    CommonModule,
    ModalComponent,
  ],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent {
  visible = false;
  investorsDiagVisible =false;
  matchedInvestors: MatchedInvestor[] = [];
  investorEligibilityScore: string = '0';
  investorPreparednessScore: string = '0';


  private _companyService = inject(CompanyStateService);
  private _scoringService = inject(BusinessOnboardingScoringService);


  currentCompany = this._companyService.currentCompany;

  stats$ = this._scoringService.getMatchedInvestors().pipe(tap(res => {
    this.matchedInvestors = res;
  }))

  scoring$ = this._scoringService.getOnboardingScores().pipe(tap(scores => {
    this.investorEligibilityScore = scores.investorEligibility;
    this.investorPreparednessScore = scores.investorPreparedness;
  }))

  showDialog() {
    this.visible = !this.visible;
  }

  showMatchedInvestors() {
    this.investorsDiagVisible = !this.investorsDiagVisible;
  }
}
