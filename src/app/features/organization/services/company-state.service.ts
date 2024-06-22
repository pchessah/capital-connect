import { Injectable, signal, WritableSignal } from '@angular/core';
import { Company } from '../interfaces';

@Injectable({providedIn: 'root'})
export class CompanyStateService {

  private _currentCompanySrc: WritableSignal<Company> = signal(null as any);

  setCompany(company: Company){
    this._currentCompanySrc.set(company);
  }

  get currentCompany(): Company {
    return this._currentCompanySrc()
  }

  resetCompany(){
    return this._currentCompanySrc.set(null as any)
  }

}