import { inject, Injectable } from "@angular/core";
import { SubMissionStateService } from "../business/services/submission-state.service";
import { map, switchMap } from "rxjs/operators";
import {
  BUSINESS_FINANCIALS_SUBSECTION_IDS,
  getInvestorEligibilitySubsectionIds,
  INVESTOR_ONBOARDING_SUBSECTION_IDS,
  INVESTOR_PREPAREDNESS_SUBSECTION_IDS,
} from "../business/services/onboarding.questions.service";
import { QuestionsService } from "../../features/questions/services/questions/questions.service";
import { combineLatest } from "rxjs";
import { CompanyStateService } from "../../features/organization/services/company-state.service";
import { Router } from "@angular/router";
import { LoadingService } from "../../core";

@Injectable({
  providedIn: 'root'
})

export class DynamicRoutingService {
  private _submissionStateService = inject(SubMissionStateService);
  private _questionService = inject(QuestionsService);
  private _companyStateService = inject(CompanyStateService)
  private _route = inject(Router)
  private _loadingService = inject(LoadingService)

  private _getUniqueNumbers(numbers: number[]): number[] {
    const uniqueNumbersSet = new Set(numbers);
    const uniqueNumbersArray = Array.from(uniqueNumbersSet);
    return uniqueNumbersArray;
}

  testGetUserSubmissions() {
    const companyGrowthStage = this._companyStateService.currentCompany.growthStage;
    const userSubmissions$ = this._submissionStateService.getUserSubmissions();
    const questionsOfBusinessFinancials$ = this._questionService.testGetSectionQuestions(BUSINESS_FINANCIALS_SUBSECTION_IDS.ID);
    const INVESTOR_ELIGIBILITY_SUBSECTION_IDS = getInvestorEligibilitySubsectionIds(companyGrowthStage)
    const questionsOfInvestorEligibilty$ = this._questionService.testGetSectionQuestions(INVESTOR_ELIGIBILITY_SUBSECTION_IDS.ID);
    const questionsOfInvestorPreparedness$ = this._questionService.testGetSectionQuestions(INVESTOR_PREPAREDNESS_SUBSECTION_IDS.ID);

    const init$ =
      userSubmissions$.pipe(
        switchMap((userSubmissions) => {
          this._loadingService.setLoading(true);
          return combineLatest([questionsOfBusinessFinancials$, questionsOfInvestorEligibilty$, questionsOfInvestorPreparedness$])
            .pipe(map(([questionsOfBusinessFinancials, questionsOfInvestorEligibilty, questionsOfInvestorPreparedness]) => {

              const userSubmissionQuestionIds = this._getUniqueNumbers(userSubmissions.map(us => us.question.id));

              const missingBusinessFinancialSubsectionIds = questionsOfBusinessFinancials
                .filter(question => !userSubmissionQuestionIds.includes(question.id))
                .map(question => question.subSection.id);


              if (missingBusinessFinancialSubsectionIds.length > 0) {
                const url = '/business/financials'
                if (missingBusinessFinancialSubsectionIds.includes(BUSINESS_FINANCIALS_SUBSECTION_IDS.LANDING)) {
                  this._route.navigateByUrl(url, { state: { data: { page: 1, step: 1 } } })
                } else if (missingBusinessFinancialSubsectionIds.includes(BUSINESS_FINANCIALS_SUBSECTION_IDS.STEP_ONE)) {
                  this._route.navigateByUrl(url, { state: { data: { page: 2, step: 1 } } })
                }
                else if (missingBusinessFinancialSubsectionIds.includes(BUSINESS_FINANCIALS_SUBSECTION_IDS.STEP_TWO)) {
                  this._route.navigateByUrl(url, { state: { data: { page: 2, step: 2 } } })
                }
                else if (missingBusinessFinancialSubsectionIds.includes(BUSINESS_FINANCIALS_SUBSECTION_IDS.STEP_THREE)) {
                  this._route.navigateByUrl(url, { state: { data: { page: 2, step: 3 } } })
                }
                this._loadingService.setLoading(false)
                return (false)
              }

              const missingInvestorEligibilitySubsectionIds = questionsOfInvestorEligibilty.filter(question => !userSubmissionQuestionIds.includes(question.id))
                .map(question => question.subSection.id);

              if (missingInvestorEligibilitySubsectionIds.length > 0) {
                const url = '/business/investor-eligibility'
                if (missingInvestorEligibilitySubsectionIds.includes(INVESTOR_ELIGIBILITY_SUBSECTION_IDS.LANDING)) {
                  this._route.navigateByUrl(url, { state: { data: { page: 1, step: 1 } } })
                } else if (missingInvestorEligibilitySubsectionIds.includes(INVESTOR_ELIGIBILITY_SUBSECTION_IDS.STEP_ONE)) {
                  this._route.navigateByUrl(url, { state: { data: { page: 2, step: 1 } } })
                }
                else if (missingInvestorEligibilitySubsectionIds.includes(INVESTOR_ELIGIBILITY_SUBSECTION_IDS.STEP_TWO)) {
                  this._route.navigateByUrl(url, { state: { data: { page: 2, step: 2 } } })
                }
                else if (missingInvestorEligibilitySubsectionIds.includes(INVESTOR_ELIGIBILITY_SUBSECTION_IDS.STEP_THREE)) {
                  this._route.navigateByUrl(url, { state: { data: { page: 2, step: 3 } } })
                }
                this._loadingService.setLoading(false)
                return (false)
              }

              const missingInvestorPreparednessSubsectionIds = questionsOfInvestorPreparedness.filter(question => !userSubmissionQuestionIds.includes(question.id))
                .map(question => question.subSection.id);

              if (missingInvestorPreparednessSubsectionIds.length > 0) {
                const url = '/business/investor-preparedness'
                if (missingInvestorPreparednessSubsectionIds.includes(INVESTOR_PREPAREDNESS_SUBSECTION_IDS.LANDING)) {
                  this._route.navigateByUrl(url, { state: { data: { page: 1, step: 1 } } })
                } else if (missingInvestorPreparednessSubsectionIds.includes(INVESTOR_PREPAREDNESS_SUBSECTION_IDS.STEP_ONE)) {
                  this._route.navigateByUrl(url, { state: { data: { page: 2, step: 1 } } })
                }
                else if (missingInvestorPreparednessSubsectionIds.includes(INVESTOR_PREPAREDNESS_SUBSECTION_IDS.STEP_TWO)) {
                  this._route.navigateByUrl(url, { state: { data: { page: 2, step: 2 } } })
                }
                else if (missingInvestorPreparednessSubsectionIds.includes(INVESTOR_PREPAREDNESS_SUBSECTION_IDS.STEP_THREE)) {
                  this._route.navigateByUrl(url, { state: { data: { page: 2, step: 3 } } })
                }
                return (false)
              }

              this._route.navigateByUrl('/business')
              this._loadingService.setLoading(false)
              return true;
            }))
        })
      )


    return init$
  }

  testGetInvestorSubmission() {
    this._loadingService.setLoading(true)
    const questionsOfInvestorOnboarding$ = this._questionService.testGetSectionQuestions(INVESTOR_ONBOARDING_SUBSECTION_IDS.ID);
    const userSubmissions$ = this._submissionStateService.getUserSubmissions()
    const init$ = combineLatest([userSubmissions$, questionsOfInvestorOnboarding$]).pipe(map(([userSubmissions, questionsOfInvestorOnboarding]) => {
      const userSubmissionQuestionIds = userSubmissions.map(us => us.question.id);

      const missingInvestorOnboardingIds = questionsOfInvestorOnboarding
        .filter(question => !userSubmissionQuestionIds.includes(question.id))
        .map(question => question.subSection.id);

      if (missingInvestorOnboardingIds.length > 0) {
        const url = '/investor/onboarding'
        if (missingInvestorOnboardingIds.includes(INVESTOR_ONBOARDING_SUBSECTION_IDS.LANDING)) {
          this._route.navigateByUrl(url, { state: { data: { page: 1, step: 1 } } })
        } else if (missingInvestorOnboardingIds.includes(INVESTOR_ONBOARDING_SUBSECTION_IDS.STEP_ONE)) {
          this._route.navigateByUrl(url, { state: { data: { page: 2, step: 1 } } })
        }
        else if (missingInvestorOnboardingIds.includes(INVESTOR_ONBOARDING_SUBSECTION_IDS.STEP_TWO)) {
          this._route.navigateByUrl(url, { state: { data: { page: 2, step: 2 } } })
        }
        else if (missingInvestorOnboardingIds.includes(INVESTOR_ONBOARDING_SUBSECTION_IDS.STEP_THREE)) {
          this._route.navigateByUrl(url, { state: { data: { page: 2, step: 3 } } })
        }

        this._loadingService.setLoading(false)
        return (false)
      }
      this._route.navigateByUrl('/investor')
      this._loadingService.setLoading(false)
      return true
    }))

    return init$

  }


}
