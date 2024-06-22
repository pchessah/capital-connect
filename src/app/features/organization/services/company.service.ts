import { Injectable } from '@angular/core';
import { BASE_URL, BaseHttpService } from '../../../core';
import { HttpClient } from '@angular/common/http';
import { CompanyInput, CompanyResponse } from '../interfaces';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class CompanyHttpService extends BaseHttpService {
  constructor(private _httpClient: HttpClient) { 
    super(_httpClient);
  }

  createCompany(companyInput:CompanyInput) {
    return this.create(`${BASE_URL}/company`, companyInput) as Observable<CompanyResponse>
  }

  getCompanyOfUser(id:number){
    return this.readById(`${BASE_URL}/company/owner`, id) as Observable<CompanyResponse>
  }
  
}