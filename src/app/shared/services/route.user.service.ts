import {catchError, map} from "rxjs/operators";
import {inject, Injectable} from "@angular/core";
import {USER_ROLES} from "../interfaces/user.interface";
import {SubMissionStateService} from "../business/services/submission-state.service";
import {CompanyStateService} from "../../features/organization/services/company-state.service";
import {CompanyHttpService} from "../../features/organization/services/company.service";
import {EMPTY, Observable, switchMap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RouteUserService {
  private _submissionStateService =inject(SubMissionStateService);
  private _companyService =inject(CompanyHttpService)
  private _companyStateService =inject(CompanyStateService);

  redirectUser(userId:number){
    
  }
}
