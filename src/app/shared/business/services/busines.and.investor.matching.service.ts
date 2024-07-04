import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { BASE_URL, BaseHttpService } from "../../../core";
import { Score } from "./onboarding.questions.service";
import { MatchedBusiness } from "../../interfaces";

@Injectable({
  providedIn: 'root'
})

export class BusinessAndInvestorMatchingService extends BaseHttpService {
  constructor(private _httpClient: HttpClient) {
    super(_httpClient);
  }

  getMatchedInvestors() {
    return new Observable<{ count?: 0 }>();
  }

  getMatchedBusinesses(investorId: number) {
    debugger
    return this.readById(`${BASE_URL}/company/invesetor-matches`, investorId).pipe(map(res => {
      return res as MatchedBusiness[]
    }))
  }

  getUserScores(userId: number, sectionId: number): Observable<Score> {
    return this.read(`${BASE_URL}/submissions/user/${userId}/score/${sectionId}`).pipe((map(res => {
      return res;
    }))) as unknown as Observable<Score>
  }

}
