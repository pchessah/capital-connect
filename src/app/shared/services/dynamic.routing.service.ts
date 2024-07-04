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

@Injectable({
  providedIn: 'root'
})

export class DynamicRoutingService {
  private _submissionStateService = inject(SubMissionStateService);
  private _questionService = inject(QuestionsService);
  private _companyStateService = inject(CompanyStateService)
  private _userSubmissions$ = this._submissionStateService.getUserSubmissions();


  testGetUserSubmissions() {
  
    const companyGrowthStage = this._companyStateService.currentCompany.growthStage;

    const questionsOfBusinessFinancials$ = this._questionService.testGetSectionQuestions(BUSINESS_FINANCIALS_SUBSECTION_IDS.ID);
    const questionsOfInvestorEligibilty$ = this._questionService.testGetSectionQuestions(getInvestorEligibilitySubsectionIds(companyGrowthStage).ID);
    const questionsOfInvestorPreparedness$ = this._questionService.testGetSectionQuestions(INVESTOR_PREPAREDNESS_SUBSECTION_IDS.ID);

    const init$ = 
    combineLatest([this._userSubmissions$, questionsOfBusinessFinancials$, questionsOfInvestorEligibilty$, questionsOfInvestorPreparedness$])
        .pipe(map(([userSubmissions, questionsOfBusinessFinancials, questionsOfInvestorEligibilty, questionsOfInvestorPreparedness]) => {

      const userSubmissionQuestionIds = new Set(userSubmissions.map(us => us.question.id));

      const missingBusinessFinancialSubsectionIds = questionsOfBusinessFinancials
        .filter(question => !userSubmissionQuestionIds.has(question.id))
        .map(question => question.subSection.id);

      if (missingBusinessFinancialSubsectionIds.length > 0) {
        //Route to missing subsection step
      debugger
        return (false)
      }

      const missingInvestorEligibilitySubsectionIds = questionsOfInvestorEligibilty.filter(question => !userSubmissionQuestionIds.has(question.id))
        .map(question => question.subSection.id);

      if (missingInvestorEligibilitySubsectionIds.length > 0) {
        //Route to missing investor eligibilty  subsection
        debugger
        return (false)
      }

      const missingInvestorPreparednessSubsectionIds = questionsOfInvestorPreparedness.filter(question => !userSubmissionQuestionIds.has(question.id))
        .map(question => question.subSection.id);

      if (missingInvestorPreparednessSubsectionIds.length > 0) {
        debugger
        //Route to missing investor preparedness  subsection
        return (false)
      }

      //route to dashboard
      debugger
      return true


    }))

    return init$
  }

testGetInvestorSubmission() {
  const questionsOfInvestorOnboarding$ = this._questionService.testGetSectionQuestions(INVESTOR_ONBOARDING_SUBSECTION_IDS.ID);

  const init$ = combineLatest([this._userSubmissions$,questionsOfInvestorOnboarding$]).pipe(map(([userSubmissions, questionsOfInvestorOnboarding]) => {
 const userSubmissionQuestionIds = new Set(userSubmissions.map(us => us.question.id));

      const missingInvestorOnboardingIds = questionsOfInvestorOnboarding
        .filter(question => !userSubmissionQuestionIds.has(question.id))
        .map(question => question.subSection.id);

      if (missingInvestorOnboardingIds.length > 0) {
        //Route to missing subsection step
      debugger
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
