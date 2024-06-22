import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateUserInput, FORM_TYPE } from '../interfaces/auth.interface';
import { BASE_URL, BaseHttpService, FeedbackService } from '../../../core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators'
import { AuthStateService } from './auth-state.service';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService extends BaseHttpService {

  private _feedBackService = inject(FeedbackService);
  private _authStateService = inject(AuthStateService);
  private _router = inject(Router);

  constructor(private _httpClient: HttpClient) {
    super(_httpClient)
  }

  signUpUser(user: CreateUserInput) {
    return this.create(`${BASE_URL}/auth/signup`, JSON.stringify(user)).pipe(tap(() => {
      this._feedBackService.success('Signed Up Successfully, Now Log In.')
    }))
  }

  login(loginInfo: { username: string, password: string }) {
    return this.create(`${BASE_URL}/auth/login`, JSON.stringify(loginInfo)).pipe(map((res) => {
      this._feedBackService.success('Logged In Successfully, Welcome.')
      this._authStateService.setToken((res as { access_token: string }).access_token)
      return res
    })) as Observable<{ access_token: string }>
  }

  logout() {
    this._authStateService.removeToken();
    this._feedBackService.success('Logged Out! See you soon!')
    this._router.navigateByUrl('/landing',  { state: { mode: FORM_TYPE.SIGNIN } });
  }

}