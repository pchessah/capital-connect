import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({providedIn: 'root'})
export class AuthStateService {

  currentToken:WritableSignal<string> = signal(sessionStorage.getItem('token') as string) ?? null
  setToken(token: string) {
    sessionStorage.setItem('token', token);
    this.currentToken.set(token);
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
  
}