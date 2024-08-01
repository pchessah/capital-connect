import {Injectable,inject} from "@angular/core";
import {BehaviorSubject, map, Observable} from "rxjs";
import { AuthStateService } from "../../auth/services/auth-state.service";
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { BASE_URL, BaseHttpService } from "../../../core";
import { Investor,RegistrationStructure, InvestorProfile,Sector,SubSector,ContactPerson,
  EsgFocusAreaOptions,InvestmentStructureOptions,InvestorTypeOptions,BusinessGrowthStageOptions, UseOfFundsOptions
} from "../../../shared/interfaces/Investor";

@Injectable(
  {
    providedIn: 'root'
  }
)

export class InvestorScreensService extends BaseHttpService{
  private _currentScreenSRC =new BehaviorSubject<number>(1)
  private _currentStepSRC =new BehaviorSubject<number>(1);

  authStateService = inject(AuthStateService);
  token = this.authStateService.authToken;
  constructor(private _httpClient: HttpClient, private router: Router) {
    super(_httpClient);
  }

  private headers = new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8',
    'Authorization': `Bearer ${this.token}`
  });

  currentScreen$ =this._currentScreenSRC.asObservable();
  currentStep$ =this._currentStepSRC.asObservable();

  setCurrentScreen(screen: number) {
    this._currentScreenSRC.next(screen);
  }

  setCurrentStep(step: number){
    this._currentStepSRC.next(step);
  }


  //Apis
  createInvestorProfile(request: InvestorProfile): Observable<InvestorProfile>{
    const url = `${BASE_URL}/investor-profiles`;
    return this.create(url, request, this.headers) as Observable<InvestorProfile>;
  }

  //  Get Registration structures prod
  getRegistrationStructures(): Observable<RegistrationStructure[]> {
    return this.read(`${BASE_URL}/registration-structures`, this.headers) as unknown as Observable<RegistrationStructure[]>;
  }


  // // # Get ESG focus areas prod
  getEsgFocusAreas(): Observable<EsgFocusAreaOptions[]> {
    return this.read(`${BASE_URL}/esg-focus`, this.headers) as unknown as Observable<EsgFocusAreaOptions[]>;
  }

  // //Investment structures
  getInvestmentStructures(): Observable<InvestmentStructureOptions[]> {
    return this.read(`${BASE_URL}/investment-structures`, this.headers) as unknown as Observable<InvestmentStructureOptions[]>;
  }


  // // Get Use of funds prod
  getUseOfFunds(): Observable<UseOfFundsOptions[]> {
    return this.read(`${BASE_URL}/use-funds`, this.headers) as unknown as Observable<UseOfFundsOptions[]>;
  }

  // //Get Stages
  getStages(): Observable<BusinessGrowthStageOptions[]> {
    return this.read(`${BASE_URL}/stages`, this.headers) as unknown as Observable<BusinessGrowthStageOptions[]>;
  }

}
