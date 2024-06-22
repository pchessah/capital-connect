import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { JwtService } from '../../../core';

@Injectable({providedIn: 'root'})
export class AuthStateService {

  private _jwtService = inject(JwtService)

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
  
}