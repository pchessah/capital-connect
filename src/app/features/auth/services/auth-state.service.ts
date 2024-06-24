import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { ConfirmationService, FeedbackService, JwtService } from '../../../core';
import { Router } from '@angular/router';
import { FORM_TYPE } from '../interfaces/auth.interface';
import { tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthStateService {

  private _jwtService = inject(JwtService);
  private _confirmationService = inject(ConfirmationService);
  private _feedBackService = inject(FeedbackService);
  private _router = inject(Router);

  currentToken:WritableSignal<string> = signal(sessionStorage.getItem('token') as string) ?? null
  currentUserId:WritableSignal<number> = signal(Number(sessionStorage.getItem('userId') as string)) ?? null
  setToken(token: string) {
    sessionStorage.setItem('token', token);
    this.currentToken.set(token);
    this._setCurrentUserId()
  }

  get authToken() {
    return this.currentToken();
  }

  removeToken() {
    this.currentToken.set(null as any);
    sessionStorage.clear();
  }

  get isLoggedIn() {
    const token = this.currentToken();
    return !!token
  }

  private _setCurrentUserId(){
    const token = this.currentToken();
    if(!!token){
      const decodedToken = this._jwtService.decodeToken(token);
      if(decodedToken){
        sessionStorage.setItem('userId', String(decodedToken.sub))
        this.currentUserId.set(Number(decodedToken.sub))
      } 
    }
  }


  logout() {
    return this._confirmationService.confirm('Are you sure you want to log out?').pipe(tap(confirmation => {
      if (confirmation) {
        this.removeToken();
        this._feedBackService.success('Logged Out! See you soon!')
        this._router.navigateByUrl('/landing', { state: { mode: FORM_TYPE.SIGNIN } });
      }
    }))

  }
  
}