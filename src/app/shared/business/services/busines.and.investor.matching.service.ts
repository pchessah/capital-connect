import {BASE_URL, BaseHttpService} from "../../../core";
import {HttpClient} from "@angular/common/http";
import {map, Observable, tap} from "rxjs";
import {Injectable} from "@angular/core";
import {ISCORE} from "./onboarding.questions.service";
import {UserSubmissionResponse} from "../../interfaces/submission.interface";

export interface IMatchedBusiness {
  country:string,
  businessSector:string,
  growthStage:string
}
@Injectable({
  providedIn: 'root'
})


export class BusinessAndInvestorMatchingService extends BaseHttpService {
  constructor(private _httpClient: HttpClient) {
    super(_httpClient);
  }

  getMatchedInvestors(){
    return new Observable<{count?: 0}>();
  }

  getMatchedBusinesses(investorId: number){
    return this.readById(`${BASE_URL}/company/invesetor-matches`, investorId).pipe(map(res =>{
      return res as IMatchedBusiness[]
    }))
  }

  getUserScores(userId: number, sectionId: number):Observable<ISCORE>{
    return this.read(`${BASE_URL}/submissions/user/${userId}/score/${sectionId}`).pipe((map(res => {
      return res;
    }))) as unknown as Observable<ISCORE>
  }

}
