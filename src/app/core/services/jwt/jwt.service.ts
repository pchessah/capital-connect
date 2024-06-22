import { Injectable } from '@angular/core';
import { jwtDecode, JwtPayload } from "jwt-decode";



@Injectable({ providedIn: 'root' })
export class JwtService {
  decodeToken(token: string): JwtPayload | null {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error('Invalid token:', error);
      return null;
    }
  }

}