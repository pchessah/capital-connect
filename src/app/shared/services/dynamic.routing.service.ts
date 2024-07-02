import {inject, Injectable} from "@angular/core";
import {SubMissionStateService} from "../business/services/submission-state.service";
import {map} from "rxjs/operators";
import {
  BUSINESS_FINANCIALS_SUBSECTION_IDS, ESUBSECTIONS, getInvestorEligibilitySubsectionIds,
  INVESTOR_PREPAREDNESS_SUBSECTION_IDS,
  ISCORE,
  ISECTION
} from "../business/services/onboarding.questions.service";
import {GrowthStage} from "../../features/organization/interfaces";


@Injectable({
  providedIn: 'root'
})

export class DynamicRoutingService {
  private _submissionStateService =inject(SubMissionStateService);

  getInvestorSubmissions(){
    return this._submissionStateService.getUserSubmissions().pipe(map(submissions => {
      return submissions.length > 0;
    }))
  }
  getUserSubmissions(companyGrowthStage: GrowthStage){
    return this._submissionStateService.getUserSubmissionsScore().pipe(map((submissions ) => {
      // @ts-ignore
      const questions =submissions.score as  ISCORE[];
      let progress =this.checkSubsectionProgress(BUSINESS_FINANCIALS_SUBSECTION_IDS, questions)
      if(progress.length >0) return ['/business/financials', ...progress];
      progress =this.checkSubsectionProgress(getInvestorEligibilitySubsectionIds(companyGrowthStage), questions)
      if(progress.length >0) return ['/business/investor-eligibility', ...progress];
      progress =this.checkSubsectionProgress(INVESTOR_PREPAREDNESS_SUBSECTION_IDS, questions)
      if(progress.length >0) return ['/business/investor-preparedness', ...progress];
      return ['/business']
    }))
  }

  checkSubsectionProgress(subsection: ISECTION, questions: ISCORE[]){
    const ids =Object.keys(subsection)
    for (let key of ids){
      switch (key as ESUBSECTIONS){
        case ESUBSECTIONS.LANDING:
          if(!this.isAnswered(questions.find(question =>question.subSectionId ==subsection.LANDING)))
            return [1]
          break
        case ESUBSECTIONS.STEP_ONE:
          if(!this.isAnswered(questions.find(question =>question.subSectionId ==subsection.STEP_ONE)))
            return [2, 1]
          break
        case ESUBSECTIONS.STEP_TWO:
          if(!this.isAnswered(questions.find(question =>question.subSectionId ==subsection.STEP_TWO)))
            return [2, 2]
          break
        case ESUBSECTIONS.STEP_THREE:
          if(!this.isAnswered(questions.find(question =>question.subSectionId ==subsection.STEP_THREE)))
            return [2, 3]
          break
      }
    }
    return []
  }

  isAnswered(subsection?:ISCORE){
    if(!subsection) return true
    return (subsection.score == 0 && subsection.targetScore == 0) || (subsection.score > 0);
  }
}
