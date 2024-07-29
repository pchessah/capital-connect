import { Injectable,inject} from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseHttpService } from '../../core/http/base/base.http.service';
import { BASE_URL } from '../../core';
import { Country } from '../interfaces/countries';
import { AuthStateService } from '../../features/auth/services/auth-state.service';



@Injectable({
  providedIn: 'root'
})
export class CountriesService extends BaseHttpService {
    authStateService = inject(AuthStateService);
    token = this.authStateService.authToken;

  private headers = new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8',
    'Authorization': `Bearer ${this.token}`
  });


  getCountries() : Observable<Country[]>{
    const url =  `${BASE_URL}/countries`;
    return this.read(url, this.headers) as unknown as Observable<Country[]>;
  }

}