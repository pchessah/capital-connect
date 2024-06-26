import { Injectable } from "@angular/core";
import { BASE_URL, BaseHttpService } from "../../../core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../interfaces/auth.interface";

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseHttpService {

  constructor(_httpClient:HttpClient){
    super(_httpClient)
  }

  getUserById(id:number){
    return this.readById(`${BASE_URL}/users`, id) as Observable<User>
  }

}

