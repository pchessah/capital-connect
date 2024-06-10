import { Injectable } from '@angular/core';
import { BaseHttpService } from '../../../core/http/base/base.http.service';
import { CreateUserInput } from '../interfaces/auth.interface';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../../../core/http/base/constants';

@Injectable({ providedIn: 'root' })
export class AuthService extends BaseHttpService {


  constructor(private _httpClient: HttpClient) {
    super(_httpClient)
  }

  signUpUser(user: CreateUserInput) {
    return this.create(`${BASE_URL}/auth/signup`, JSON.stringify(user))
  }

}