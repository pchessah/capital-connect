import { Component, inject , ViewChild, ElementRef} from '@angular/core';
import { OverviewSectionComponent } from "../../../../../shared/components/overview-section/overview-section.component";
import { CardComponent } from "../../../../../shared/components/card/card.component";
import { PhotoCollageComponent } from "../photo-collage/photo-collage.component";
import { tap } from "rxjs";
import { CommonModule } from "@angular/common";
import { ModalComponent } from "../../../../../shared/components/modal/modal.component";
import { CompanyStateService } from "../../../../organization/services/company-state.service";
import { BusinessOnboardingScoringService } from "../../../../../shared/services/business.onboarding.scoring.service";
import { MatchedInvestor } from "../../../../../shared/interfaces";
import { PdfGeneratorService } from '../../../../../shared/services/pdf-generator.service';
import { SubMissionStateService } from '../../../../../shared';

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
  @ViewChild('content', { static: false }) content!: ElementRef;
  visible = false;
  investorsDiagVisible = false;
  matchedInvestors: MatchedInvestor[] = [];
  investorEligibilityScore: string = '0';
  investorPreparednessScore: string = '0';
  answers: any[] = [];
  userId: number = 333;
  generalSummary : any;

  private _companyService = inject(CompanyStateService);
  private _scoringService = inject(BusinessOnboardingScoringService);
  private _pdfService = inject(PdfGeneratorService)
  private _submissionStateService = inject(SubMissionStateService)


  currentCompany = this._companyService.currentCompany;

  stats$ = this._scoringService.getMatchedInvestors().pipe(tap(res => {
    this.matchedInvestors = res;
  }))

  scoring$ = this._scoringService.getOnboardingScores().pipe(tap(scores => {
    this.investorEligibilityScore = scores.investorEligibility;
    this.investorPreparednessScore = scores.investorPreparedness;
    
  }))

  submissions$ = this._submissionStateService.getUserSubmissionsPerSection().pipe(tap(submissions => {
    if(submissions[0]?.question?.type === "SHORT_ANSWER"){
      this.answers = submissions
    }else{
      this.answers = submissions
    } 
  }))

  preparednessScore = parseFloat(this.investorPreparednessScore); 
  generalSummary$ = this._scoringService.getGeneralSummary(this.preparednessScore,"PREPAREDNESS").pipe(tap(generalSummary => {
    this.generalSummary = generalSummary
  }))

  showDialog() {
    this.visible = !this.visible;
  }

  showMatchedInvestors() {
    this.investorsDiagVisible = !this.investorsDiagVisible;
  }

  generatePDF() {
    if (this.content && this.content.nativeElement) {
      const contentElement = this.content.nativeElement;
      this._pdfService.generatePDF(contentElement, 'InvestorReadyReport');
    } else {
      console.error('Content element is null or undefined.');
    }
  }

}
