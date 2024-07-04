import {inject, Injectable} from "@angular/core";
import {SubMissionStateService} from "../business/services/submission-state.service";
import {map, switchMap} from "rxjs/operators";
import {
  BUSINESS_FINANCIALS_SUBSECTION_IDS,
  ESUBSECTIONS,
  getInvestorEligibilitySubsectionIds,
  INVESTOR_ONBOARDING_SUBSECTION_IDS,
  INVESTOR_PREPAREDNESS_SUBSECTION_IDS,
  Score,
  ISECTION
} from "../business/services/onboarding.questions.service";
import {GrowthStage} from "../../features/organization/interfaces";
import { UserSubmissionResponse} from "../interfaces/submission.interface";
import {QuestionsService} from "../../features/questions/services/questions/questions.service";
import {SubSection} from "../../features/questions/interfaces";
import {of} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class DynamicRoutingService {
  private _submissionStateService =inject(SubMissionStateService);
  private _questionService =inject(QuestionsService)

  //
  getInvestorSubmissions(){
    return this._getSubsectionSubmissions(INVESTOR_ONBOARDING_SUBSECTION_IDS).pipe(map(sections =>{
      return sections.length? ['/investor/onboarding', ...sections]: ['/investor']
    }))
  }

  getUserSubmissions(companyGrowthStage: GrowthStage){

    return this._getSubsectionSubmissions(BUSINESS_FINANCIALS_SUBSECTION_IDS).pipe(
      switchMap((missing_sections) => {
        if (missing_sections.length) {
          return of(['/business/financials', ...missing_sections]);
        } else {
          return this._getSubsectionSubmissions(getInvestorEligibilitySubsectionIds(companyGrowthStage)).pipe(
            switchMap((secs) => {
              if (secs.length) {
                return of(['/business/investor-eligibility', ...secs]);
              } else {
                return this._getSubsectionSubmissions(INVESTOR_PREPAREDNESS_SUBSECTION_IDS).pipe(
                  map((sections) => {
                    if (sections.length) {
                      return ['/business/investor-preparedness', ...sections];
                    } else {
                      return ['/business'];
                    }
                  })
                );
              }
            })
          );
        }
      })
    );
  }
  private _getSubsectionSubmissions(section:ISECTION){
    return this._questionService.getSectionQuestions(section.ID).pipe(switchMap(questions =>{
      return this._submissionStateService.getUserSubmissions().pipe(map(submissions => {
        for(let id of Object.keys(section)){
          let subsectionID =-1
          switch(id as ESUBSECTIONS) {
            case ESUBSECTIONS.LANDING:
              subsectionID =section.LANDING as number
              if(!this.subsectionSubmitted(subsectionID, submissions, questions.find(question =>question.id ==subsectionID).questions || []))
                return [1]
              break
            case ESUBSECTIONS.STEP_ONE:
              subsectionID =section.STEP_ONE
              if(!this.subsectionSubmitted(subsectionID, submissions, questions.find(question =>question.id ==subsectionID).questions || []))
                return [2, 1]
              break
            case ESUBSECTIONS.STEP_TWO:
              subsectionID =section.STEP_TWO
              if(!this.subsectionSubmitted(subsectionID, submissions, questions.find(question =>question.id ==subsectionID).questions || []))
                return [2, 2]
              break
            case ESUBSECTIONS.STEP_THREE:
              subsectionID =section.STEP_THREE
              if(!this.subsectionSubmitted(subsectionID, submissions, questions.find(question =>question.id ==subsectionID).questions || []))
                return [2, 3]
              break
          }

        }
        return []
      }))
    }))
  }
  subsectionSubmitted(id:number, submissions: any[], questions:any[]){
    // @ts-ignore
    const investorSubmissions =submissions.filter(submission => submission.question.subSection.id ===id )
    return (investorSubmissions.length >0 && questions.length >0) || (investorSubmissions.length ===0 && questions.length ===0)

  }
}
