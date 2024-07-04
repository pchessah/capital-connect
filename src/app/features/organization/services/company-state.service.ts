import { Injectable, signal, WritableSignal } from '@angular/core';
import { Company } from '../interfaces';

@Injectable({ providedIn: 'root' })
export class CompanyStateService {
  private _currentCompanySrc: WritableSignal<Company> = signal(JSON.parse(sessionStorage.getItem('currentCompany') as string)  as Company);

  setCompany(company: Company) {
    sessionStorage.setItem('currentCompany', JSON.stringify(company));
    this._currentCompanySrc.set(company);
  }

  get currentCompany(): Company {
    if (this._currentCompanySrc()) return this._currentCompanySrc()
    return JSON.parse(sessionStorage.getItem('currentCompany') as string)  as Company
  }

  resetCompany() {
    sessionStorage.removeItem('currentCompany')
    return this._currentCompanySrc.set(null as any)
  }

}
