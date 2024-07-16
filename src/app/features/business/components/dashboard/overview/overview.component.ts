import { Component, inject , ViewChild, ElementRef} from '@angular/core';
import { OverviewSectionComponent } from "../../../../../shared/components/overview-section/overview-section.component";
import { CardComponent } from "../../../../../shared/components/card/card.component";
import { PhotoCollageComponent } from "../photo-collage/photo-collage.component";
import { tap,switchMap  } from "rxjs";
import { CommonModule } from "@angular/common";
import { ModalComponent } from "../../../../../shared/components/modal/modal.component";
import { CompanyStateService } from "../../../../organization/services/company-state.service";
import { BusinessOnboardingScoringService } from "../../../../../shared/services/business.onboarding.scoring.service";
import { MatchedInvestor } from "../../../../../shared/interfaces";
import { PdfGeneratorService } from '../../../../../shared/services/pdf-generator.service';
import { SubMissionStateService } from '../../../../../shared';
import { UserSubmissionResponse } from '../../../../../shared';
import { GeneralSummary } from '../../../../../shared';
import { RemoveQuotesPipe } from '../../../../../shared/pipes/remove-quotes.pipe';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [
    OverviewSectionComponent,
    CardComponent,
    PhotoCollageComponent,
    CommonModule,
    ModalComponent,
    RemoveQuotesPipe
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
  answers: UserSubmissionResponse[] = [];
  generalSummary!: GeneralSummary;

  preparednessAnswers: UserSubmissionResponse[] = [];
  eligibilityAnswers: UserSubmissionResponse[] = [];


  InvestorPreparednessgeneralSummary: GeneralSummary | undefined;
  InvestorEligibilitygeneralSummary: GeneralSummary | undefined;
  

  currentModal: 'eligibility' | 'preparedness' = 'eligibility';
  


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
    this.eligibilityAnswers = submissions
  }))

  preparednessSubmissions$ = this._submissionStateService.getUserPreparednessSubmissionsPerSection().pipe(tap(submissions => {
    this.preparednessAnswers = submissions
  }))


  preparednessScore = parseFloat(this.investorPreparednessScore); 
  investorPreparednessGeneralSummary$ = this.scoring$.pipe(
    tap(scores => {
      this.preparednessScore = parseFloat(scores.investorPreparedness);
    }),
    switchMap(() => this._scoringService.getGeneralSummary(this.preparednessScore, "PREPAREDNESS")),
    tap(generalSummary => {
      this.InvestorPreparednessgeneralSummary = generalSummary;
    })
  );

  eligibilityScore = parseFloat(this.investorEligibilityScore); 
  investorEligibilityGeneralSummary$ = this.scoring$.pipe(
    tap(scores => {
      this.eligibilityScore = parseFloat(scores.investorEligibility);
    }),
    switchMap(() => this._scoringService.getGeneralSummary(this.eligibilityScore, "ELIGIBILITY")),
    tap(generalSummary => {
      this.InvestorEligibilitygeneralSummary = generalSummary;
    })
  );


  showDialog(reportType : string) {
    if(reportType === this.investorEligibilityScore){
      this.currentModal = "eligibility"
    }else if(reportType === this.investorPreparednessScore){
      this.currentModal = "preparedness"
    }
    this.visible = !this.visible;
  }

  showMatchedInvestors() {
    this.investorsDiagVisible = !this.investorsDiagVisible;
  }

  generatePDF() {
    if (this.content && this.content.nativeElement) {
      const contentElement = this.content.nativeElement;
      var reportName:string = '';
      if(this.currentModal === 'eligibility'){
          reportName = "InvestorEligibilityReport"
      }else if(this.currentModal === 'preparedness'){
        reportName = "InvestorPreparednessReport"
      }
      this._pdfService.generatePDF(contentElement, reportName);
    } else {
      console.error('Content element is null or undefined.');
    }
  }

}
