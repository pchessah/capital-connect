import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CreateUserInput, Profile } from '../interfaces/auth.interface';
import { BASE_URL, BaseHttpService, FeedbackService } from '../../../core';
import { Observable, switchMap } from 'rxjs';
import { map, tap } from 'rxjs/operators'
import { AuthStateService } from './auth-state.service';

@Injectable({ providedIn: 'root' })
export class AuthService extends BaseHttpService {

  private _feedBackService = inject(FeedbackService);
  private _authStateService = inject(AuthStateService);

  constructor(private _httpClient: HttpClient) {
    super(_httpClient)
  }

  signUpUser(user: CreateUserInput) {
    return this.create(`${BASE_URL}/auth/signup`, JSON.stringify(user)).pipe(tap(() => {
      this._feedBackService.success('Signed Up Successfully, Open your email to verify.')
    }))
  }

  getUserProfile() {
    return this.read(`${BASE_URL}/users/profile`) as unknown as Observable<Profile>;
  }

  login(loginInfo: { username: string, password: string }) {
    return this.create(`${BASE_URL}/auth/login`, JSON.stringify(loginInfo)).pipe(switchMap((res) => {
      this._feedBackService.success('Logged In Successfully, Welcome.')
      this._authStateService.initUser((res as { access_token: string }).access_token)
      return this.getUserProfile();
    })) as Observable<Profile>
  }

  forgotPassword(email: string) {
    return this.create(`${BASE_URL}/users/request-password-reset`, { email: email })
  }

  sendNewPassword(val: { token: string, newPassword: string, confirmNewPassword: string }) {
    return this.create(`${BASE_URL}/users/reset-password`, val)
  }

  verifyEmail(token: string) {
    const params = new HttpParams().set('token', token);
    return this._httpClient.get(`${BASE_URL}/users/verify-email`, { params: params })
  }

  resendVerification(email: string) {
    return this.create(`${BASE_URL}/auth/resend-verification-email`, { email: email }) as Observable<{ message: string }>;
  }

}
