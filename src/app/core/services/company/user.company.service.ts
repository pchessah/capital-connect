import { Injectable, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {Company} from "../../../features/organization/interfaces";

@Injectable({providedIn: 'root'})
export class UserCompanyService {
  private _company = new BehaviorSubject<Company>( {} as any);
  public  companySrc$ = this._company.asObservable();

  setCompany(org: Company): void {
    this._company.next(org);
  }
}
