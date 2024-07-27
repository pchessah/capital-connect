import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseHttpService } from '../../../core/http/base/base.http.service';
import { BASE_URL } from '../../../core';
import { Router } from '@angular/router';
import { AuthStateService } from '../../auth/services/auth-state.service';
import { InvestorProfile } from '../../../shared/interfaces/InvestorProfile';



@Injectable({
  providedIn: 'root'
})
export class InvestorProfileDetails extends BaseHttpService {
  authStateService = inject(AuthStateService);
  token = this.authStateService.authToken;

  constructor(private _httpClient: HttpClient, private router: Router) {
    super(_httpClient);
  }

  private headers = new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8',
    'Authorization': `Bearer ${this.token}`
  });

  createInvestorProfile(profile: InvestorProfile): Observable<InvestorProfile> {
    const url = `${BASE_URL}/investor-profiles`;
    return this.create(url, profile, this.headers) as Observable<InvestorProfile>;
  }

  getAllInvestorProfiles(): Observable<InvestorProfile[]> {
    const url = `${BASE_URL}/investor-profiles`;
    return this.read(url, this.headers) as Observable<InvestorProfile[]>;
  }

  getInvestorProfileById(id: number): Observable<InvestorProfile> {
    const url = `${BASE_URL}/investor-profiles/${id}`;
    return this.readById(url, id, this.headers) as Observable<InvestorProfile>;
  }

  updateInvestorProfileById(id: number, updatedProfile: Partial<InvestorProfile>): Observable<InvestorProfile> {
    const url = `${BASE_URL}/investor-profiles/${id}`;
    return this.update(url, id, updatedProfile, this.headers) as Observable<InvestorProfile>;
  }

  deleteInvestorProfileById(id: number): Observable<void> {
    const url = `${BASE_URL}/investor-profiles/${id}`;
    return this.delete(url, id, this.headers) as Observable<void>;
  }
}
