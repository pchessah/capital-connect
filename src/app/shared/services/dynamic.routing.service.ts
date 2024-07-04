import { inject, Injectable } from "@angular/core";
import { SubMissionStateService } from "../business/services/submission-state.service";
import { map, switchMap } from "rxjs/operators";
import {
  BUSINESS_FINANCIALS_SUBSECTION_IDS,
  ESUBSECTIONS,
  getInvestorEligibilitySubsectionIds,
  INVESTOR_ONBOARDING_SUBSECTION_IDS,
  INVESTOR_PREPAREDNESS_SUBSECTION_IDS,
  Score,
  ISECTION
} from "../business/services/onboarding.questions.service";
import { GrowthStage } from "../../features/organization/interfaces";
import { QuestionsService } from "../../features/questions/services/questions/questions.service";
import { combineLatest, Observable, of } from "rxjs";
import { CompanyStateService } from "../../features/organization/services/company-state.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})

export class DynamicRoutingService {
  private _submissionStateService = inject(SubMissionStateService);
  private _questionService = inject(QuestionsService);
  private _companyStateService = inject(CompanyStateService)
  private _route =inject(Router)


  testGetUserSubmissions() {

    const companyGrowthStage = this._companyStateService.currentCompany.growthStage;
    const userSubmissions$ = this._submissionStateService.getUserSubmissions();
    const questionsOfBusinessFinancials$ = this._questionService.testGetSectionQuestions(BUSINESS_FINANCIALS_SUBSECTION_IDS.ID);
    const INVESTOR_ELIGIBILITY_SUBSECTION_IDS =getInvestorEligibilitySubsectionIds(companyGrowthStage)
    const questionsOfInvestorEligibilty$ = this._questionService.testGetSectionQuestions(INVESTOR_ELIGIBILITY_SUBSECTION_IDS.ID);
    const questionsOfInvestorPreparedness$ = this._questionService.testGetSectionQuestions(INVESTOR_PREPAREDNESS_SUBSECTION_IDS.ID);

    const init$ =
    userSubmissions$.pipe(
      switchMap((submissions) => {
        return combineLatest([userSubmissions$, questionsOfBusinessFinancials$, questionsOfInvestorEligibilty$, questionsOfInvestorPreparedness$])
          .pipe(map(([userSubmissions, questionsOfBusinessFinancials, questionsOfInvestorEligibilty, questionsOfInvestorPreparedness]) => {

            const userSubmissionQuestionIds = userSubmissions.map(us => us.question.id);
            const missingBusinessFinancialSubsectionIds = questionsOfBusinessFinancials
              .filter(question => !userSubmissionQuestionIds.includes(question.id))
              .map(question => question.subSection.id);

            if (missingBusinessFinancialSubsectionIds.length > 0) {
              const url ='/business/financials'
              if (missingBusinessFinancialSubsectionIds.includes(BUSINESS_FINANCIALS_SUBSECTION_IDS.LANDING)) {
                this._route.navigateByUrl(url, {state: {data: {page: 1, step: 1}}})
              }else if(missingBusinessFinancialSubsectionIds.includes(BUSINESS_FINANCIALS_SUBSECTION_IDS.STEP_ONE)){
                this._route.navigateByUrl(url, {state: {data: {page: 2, step: 1}}})
              }
              else if(missingBusinessFinancialSubsectionIds.includes(BUSINESS_FINANCIALS_SUBSECTION_IDS.STEP_TWO)){
                this._route.navigateByUrl(url, {state: {data: {page: 2, step: 2}}})
              }
              else if(missingBusinessFinancialSubsectionIds.includes(BUSINESS_FINANCIALS_SUBSECTION_IDS.STEP_THREE)){
                this._route.navigateByUrl(url, {state: {data: {page: 2, step: 3}}})
              }
              return (false)
            }

            const missingInvestorEligibilitySubsectionIds = questionsOfInvestorEligibilty.filter(question => !userSubmissionQuestionIds.includes(question.id))
              .map(question => question.subSection.id);

            if (missingInvestorEligibilitySubsectionIds.length > 0) {
              const url ='/business/investor-eligibility'
              if (missingInvestorEligibilitySubsectionIds.includes(INVESTOR_ELIGIBILITY_SUBSECTION_IDS.LANDING)) {
                this._route.navigateByUrl(url, {state: {data: {page: 1, step: 1}}})
              }else if(missingInvestorEligibilitySubsectionIds.includes(INVESTOR_ELIGIBILITY_SUBSECTION_IDS.STEP_ONE)){
                this._route.navigateByUrl(url, {state: {data: {page: 2, step: 1}}})
              }
              else if(missingInvestorEligibilitySubsectionIds.includes(INVESTOR_ELIGIBILITY_SUBSECTION_IDS.STEP_TWO)){
                this._route.navigateByUrl(url, {state: {data: {page: 2, step: 2}}})
              }
              else if(missingInvestorEligibilitySubsectionIds.includes(INVESTOR_ELIGIBILITY_SUBSECTION_IDS.STEP_THREE)){
                this._route.navigateByUrl(url, {state: {data: {page: 2, step: 3}}})
              }
              return (false)
            }

            const missingInvestorPreparednessSubsectionIds = questionsOfInvestorPreparedness.filter(question => !userSubmissionQuestionIds.includes(question.id))
              .map(question => question.subSection.id);

            if (missingInvestorPreparednessSubsectionIds.length > 0) {
              const url ='/business/financials'
              if (missingInvestorPreparednessSubsectionIds.includes(INVESTOR_PREPAREDNESS_SUBSECTION_IDS.LANDING)) {
                this._route.navigateByUrl(url, {state: {data: {page: 1, step: 1}}})
              }else if(missingInvestorPreparednessSubsectionIds.includes(INVESTOR_PREPAREDNESS_SUBSECTION_IDS.STEP_ONE)){
                this._route.navigateByUrl(url, {state: {data: {page: 2, step: 1}}})
              }
              else if(missingInvestorPreparednessSubsectionIds.includes(INVESTOR_PREPAREDNESS_SUBSECTION_IDS.STEP_TWO)){
                this._route.navigateByUrl(url, {state: {data: {page: 2, step: 2}}})
              }
              else if(missingInvestorPreparednessSubsectionIds.includes(INVESTOR_PREPAREDNESS_SUBSECTION_IDS.STEP_THREE)){
                this._route.navigateByUrl(url, {state: {data: {page: 2, step: 3}}})
              }
              return (false)
            }

            //route to dashboard

            return true


          }))
      })
    )


    return init$
  }

testGetInvestorSubmission() {
  const questionsOfInvestorOnboarding$ = this._questionService.testGetSectionQuestions(INVESTOR_ONBOARDING_SUBSECTION_IDS.ID);
  const userSubmissions$ =this._submissionStateService.getUserSubmissions()
  const init$ = combineLatest([userSubmissions$,questionsOfInvestorOnboarding$]).pipe(map(([userSubmissions, questionsOfInvestorOnboarding]) => {
 const userSubmissionQuestionIds = userSubmissions.map(us => us.question.id);

      const missingInvestorOnboardingIds = questionsOfInvestorOnboarding
        .filter(question => !userSubmissionQuestionIds.includes(question.id))
        .map(question => question.subSection.id);

      if (missingInvestorOnboardingIds.length > 0) {
        //Route to missing subsection step

        return (false)
      }

      return true
  }))

  return init$

}

  getInvestorSubmissions() {
    return this._questionService.getSectionQuestions(INVESTOR_ONBOARDING_SUBSECTION_IDS.ID).pipe(switchMap(questions => {
      return this._submissionStateService.getUserSubmissions().pipe(map(submissions => {
        for (let id of Object.keys(INVESTOR_ONBOARDING_SUBSECTION_IDS)) {
          let subsectionID = 0
          switch (id as ESUBSECTIONS) {
            case ESUBSECTIONS.LANDING:
              subsectionID = INVESTOR_ONBOARDING_SUBSECTION_IDS.LANDING
              if (!this.subsectionSubmitted(subsectionID, submissions, questions.find((question: { id: number; }) => question.id == subsectionID).questions || []))
                return ['/investor/onboarding', [1]]
              break
            case ESUBSECTIONS.STEP_ONE:
              subsectionID = INVESTOR_ONBOARDING_SUBSECTION_IDS.STEP_ONE
              if (!this.subsectionSubmitted(subsectionID, submissions, questions.find((question: { id: number; }) => question.id == subsectionID).questions || []))
                return ['/investor/onboarding', [2, 1]]
              break
            case ESUBSECTIONS.STEP_TWO:
              subsectionID = INVESTOR_ONBOARDING_SUBSECTION_IDS.STEP_TWO
              if (!this.subsectionSubmitted(subsectionID, submissions, questions.find((question: { id: number; }) => question.id == subsectionID).questions || []))
                return ['/investor/onboarding', [2, 2]]
              break
            case ESUBSECTIONS.STEP_THREE:
              subsectionID = INVESTOR_ONBOARDING_SUBSECTION_IDS.STEP_THREE
              if (!this.subsectionSubmitted(subsectionID, submissions, questions.find((question: { id: number; }) => question.id == subsectionID).questions || []))
                return ['/investor/onboarding', [2, 3]]
              break
          }

        }
        return ['/investor']
      }))
    }))
  }
  getUserSubmissions(companyGrowthStage: GrowthStage) {
    return this._submissionStateService.getUserSubmissionsScore().pipe(map((submissions) => {
      // @ts-ignore
      const questions = submissions.score as Score[];
      let progress = this.checkSubsectionProgress(BUSINESS_FINANCIALS_SUBSECTION_IDS, questions)
      if (progress.length > 0) return ['/business/financials', ...progress];
      progress = this.checkSubsectionProgress(getInvestorEligibilitySubsectionIds(companyGrowthStage), questions)
      if (progress.length > 0) return ['/business/investor-eligibility', ...progress];
      progress = this.checkSubsectionProgress(INVESTOR_PREPAREDNESS_SUBSECTION_IDS, questions)
      if (progress.length > 0) return ['/business/investor-preparedness', ...progress];
      return ['/business']
    }))
  }

  checkSubsectionProgress(subsection: ISECTION, questions: Score[]) {
    const ids = Object.keys(subsection)
    for (let key of ids) {
      switch (key as ESUBSECTIONS) {
        case ESUBSECTIONS.LANDING:
          if (!this.isAnswered(questions.find(question => question.subSectionId == subsection.LANDING)))
            return [1]
          break
        case ESUBSECTIONS.STEP_ONE:
          if (!this.isAnswered(questions.find(question => question.subSectionId == subsection.STEP_ONE)))
            return [2, 1]
          break
        case ESUBSECTIONS.STEP_TWO:
          if (!this.isAnswered(questions.find(question => question.subSectionId == subsection.STEP_TWO)))
            return [2, 2]
          break
        case ESUBSECTIONS.STEP_THREE:
          if (!this.isAnswered(questions.find(question => question.subSectionId == subsection.STEP_THREE)))
            return [2, 3]
          break
      }
    }
    return []
  }
  subsectionSubmitted(id: number, submissions: any[], questions: any[]) {
    // @ts-ignore
    const investorSubmissions = submissions.filter(submission => { return submission.question.subSection.id == id })
    console.log(investorSubmissions, questions, id)
    return (investorSubmissions.length > 0 && questions.length > 0) || (investorSubmissions.length == 0 && questions.length == 0)
  }
  isAnswered(subsection?: Score) {
    if (!subsection) return true
    return (subsection.score == 0 && subsection.targetScore == 0) || (subsection.score > 0);
  }
}
