import {inject, Injectable} from "@angular/core";
import {SubMissionStateService} from "../business/services/submission-state.service";
import {map, switchMap} from "rxjs/operators";
import {
  BUSINESS_FINANCIALS_SUBSECTION_IDS,
  ESUBSECTIONS,
  getInvestorEligibilitySubsectionIds,
  INVESTOR_ONBOARDING_SUBSECTION_IDS,
  INVESTOR_PREPAREDNESS_SUBSECTION_IDS,
  ISCORE,
  ISECTION
} from "../business/services/onboarding.questions.service";
import {GrowthStage} from "../../features/organization/interfaces";
import { UserSubmissionResponse} from "../interfaces/submission.interface";
import {QuestionsService} from "../../features/questions/services/questions/questions.service";
import {SubSection} from "../../features/questions/interfaces";


@Injectable({
  providedIn: 'root'
})

export class DynamicRoutingService {
  private _submissionStateService =inject(SubMissionStateService);
  private _questionService =inject(QuestionsService)

  getInvestorSubmissions(){
    return this._questionService.getSectionQuestions(INVESTOR_ONBOARDING_SUBSECTION_IDS.ID).pipe(switchMap(questions =>{
      return this._submissionStateService.getUserSubmissions().pipe(map(submissions => {
        for(let id of Object.keys(INVESTOR_ONBOARDING_SUBSECTION_IDS)){
          let subsectionID =0
          switch(id as ESUBSECTIONS) {
            case ESUBSECTIONS.LANDING:
              subsectionID =INVESTOR_ONBOARDING_SUBSECTION_IDS.LANDING
              if(!this.subsectionSubmitted(subsectionID, submissions, questions.find(question =>question.id ==subsectionID).questions || []))
                return ['/investor/onboarding', [1]]
              break
            case ESUBSECTIONS.STEP_ONE:
              subsectionID =INVESTOR_ONBOARDING_SUBSECTION_IDS.STEP_ONE
              if(!this.subsectionSubmitted(subsectionID, submissions, questions.find(question =>question.id ==subsectionID).questions || []))
                return ['/investor/onboarding', [2, 1]]
              break
            case ESUBSECTIONS.STEP_TWO:
              subsectionID =INVESTOR_ONBOARDING_SUBSECTION_IDS.STEP_TWO
              if(!this.subsectionSubmitted(subsectionID, submissions, questions.find(question =>question.id ==subsectionID).questions || []))
                return ['/investor/onboarding', [2, 2]]
                break
            case ESUBSECTIONS.STEP_THREE:
              subsectionID =INVESTOR_ONBOARDING_SUBSECTION_IDS.STEP_THREE
              if(!this.subsectionSubmitted(subsectionID, submissions, questions.find(question =>question.id ==subsectionID).questions || []))
                return ['/investor/onboarding', [2, 3]]
              break
          }

         }
        return ['/investor']
      }))
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

  subsectionSubmitted(id:number, submissions: any[], questions:any[]){
    // @ts-ignore
    const investorSubmissions =submissions.filter(submission =>{ return submission.question.subSection.id ==id })
    console.log(investorSubmissions, questions, id)
    return (investorSubmissions.length >0 && questions.length >0) || (investorSubmissions.length ==0 && questions.length ==0)
  }

  isAnswered(subsection?:ISCORE){
    if(!subsection) return true
    return (subsection.score == 0 && subsection.targetScore == 0) || (subsection.score > 0);
  }
}
