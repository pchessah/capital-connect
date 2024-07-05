import {inject, Injectable} from "@angular/core";
import {BusinessAndInvestorMatchingService} from "../business/services/busines.and.investor.matching.service";
import {map} from "rxjs";
import {AuthStateService} from "../../features/auth/services/auth-state.service";
import {
  BUSINESS_FINANCIALS_SUBSECTION_IDS, getInvestorEligibilitySubsectionIds,
  INVESTOR_PREPAREDNESS_SUBSECTION_IDS
} from "../business/services/onboarding.questions.service";
import {CompanyStateService} from "../../features/organization/services/company-state.service";

@Injectable({
  providedIn: 'root'
})

export class BusinessOnboardingScoringService {
  private _authStateService = inject(AuthStateService);
  private _scoringService =inject(BusinessAndInvestorMatchingService)
  private _companyService =inject(CompanyStateService)
  private _userId = this._authStateService.currentUserId() && this._authStateService.currentUserId() > 0 ? this._authStateService.currentUserId() : Number(sessionStorage.getItem('userId'));
  getOnboardingScores() {
    const INVESTOR_ELIGIBILITY =getInvestorEligibilitySubsectionIds(this._companyService.currentCompany.growthStage);
    return this._scoringService.getOnboardingScores(this._userId).pipe(map(scores =>{
      const businessFinancialsKeys = [...Object.values(BUSINESS_FINANCIALS_SUBSECTION_IDS)].filter(key => key !==BUSINESS_FINANCIALS_SUBSECTION_IDS.ID);
      const investorEligibilityKeys = [...Object.values(INVESTOR_ELIGIBILITY)].filter(key => key !==INVESTOR_ELIGIBILITY.ID);
      const investorPreparednessKeys = [...Object.values(INVESTOR_PREPAREDNESS_SUBSECTION_IDS)].filter(key => key !==INVESTOR_PREPAREDNESS_SUBSECTION_IDS.ID);
      const businessFinancialScore =scores.filter((score) =>businessFinancialsKeys.indexOf(score.subSectionId??-1) >-1).map(score =>score.percentageScore)
      const investorEligibilityScore =scores.filter((score) =>investorEligibilityKeys.indexOf(score.subSectionId??-1) >-1).map(score =>score.percentageScore)
      const investorPreparednessScore =scores.filter((score) =>investorPreparednessKeys.indexOf(score.subSectionId??-1) >-1).map(score =>score.percentageScore)
      return{
        businessFinancials: Number(Math.ceil(businessFinancialScore.reduce((prev, acc) =>prev +acc,0)/businessFinancialScore.length)).toFixed(1),
        investorEligibility: Number(Math.ceil(investorEligibilityScore.reduce((prev, acc) =>prev +acc,0)/investorEligibilityScore.length)).toFixed(1),
        investorPreparedness: Number(Math.ceil(investorPreparednessScore.reduce((prev, acc) =>prev +acc,0)/investorPreparednessScore.length)).toFixed(1),
      }
    }))
  }
  getMatchedInvestors() {
    return this._scoringService.getMatchedInvestors(this._userId).pipe(map((investors:any[]) =>{
      return investors
    }))
  }
  getSectionScore(sectionId: number) {
    return this._scoringService.getSectionScore(this._userId, sectionId).pipe(map(score =>{
      return Number(score.percentageScore).toFixed(1);
    }))
  }
}