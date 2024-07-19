import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseHttpService } from '../../core/http/base/base.http.service';
import { CreateBookingRequest, CreateBookingResponse } from '../interfaces/booking';
import { BASE_URL } from '../../core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class BookingService extends BaseHttpService {
  constructor(private _httpClient: HttpClient, private router: Router) {
    super(_httpClient);
  }

  private headers = new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpyZGFuZGlhYmVsdGFAZ21haWwuY29tIiwic3ViIjo2LCJyb2xlcyI6WyJ1c2VyIl0sImlhdCI6MTcyMTIxMTgwMiwiZXhwIjoxNzIxMjk4MjAyfQ.6Vr0fX7wDsTBnRdeOp35Me7ki6_rA6Tf-jBue75KHm0'
  });


  createBooking(request: CreateBookingRequest): Observable<CreateBookingResponse> {
    const url = `${BASE_URL}/bookings`;
    return this.create(url, request, this.headers) as Observable<CreateBookingResponse>;
  }

  goToCalendly(): void {
    const calendlyUrl = 'https://calendly.com/investor-eligibility/investor-preparedness';
    window.open(calendlyUrl, '_blank');
  }

}
