import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BaseHttpService } from "../../http/base/base.http.service";
import { Injectable } from "@angular/core";
import { BASE_URL } from "../../http/base/constants";


@Injectable({
  providedIn: 'root'
})
 export class UploadService extends BaseHttpService {

  constructor(_httpClient: HttpClient){
    super(_httpClient)
  }

  uploadFile(file: File) {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    const headers = new HttpHeaders({
      'enctype': 'multipart/form-data'
    });

    return this.create(`${BASE_URL}/files/upload-logo`, formData, headers)
  }

  
 }