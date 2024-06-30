import {BaseHttpService} from "../../../core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";


class BusinessAndInvestorMatchingService extends BaseHttpService {
  constructor(private _httpClient: HttpClient) {
    super(_httpClient);
  }

  getMatchedInvestors(){
    return new Observable<{count?: 0}>();
  }

  getMatchedBusinesses(){
    return new Observable<{count?: 0}>();
  }
}
