import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseHttpService } from '../../core/http/base/base.http.service';
import { BASE_URL } from '../../core';
import { AuthResponse } from '../interfaces/payment';
import { OrderRequest } from '../interfaces/payment';
import { TransactionStatus } from '../interfaces/payment';
import { OrderCancellation } from '../interfaces/payment';
import { RefundRequest } from '../interfaces/payment';
import { IPNRegistration } from '../interfaces/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService extends BaseHttpService {
  private headers = new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8',
  });

  constructor(private _httpClient: HttpClient) {
    super(_httpClient);
  }

  authenticate(consumer_key: string, consumer_secret: string): Observable<AuthResponse> {
    const url = `${BASE_URL}/Auth/RequestToken`;
    const body = { consumer_key, consumer_secret };
    return this.create(url, body, this.headers) as Observable<AuthResponse>;
  }

  getTransactionStatus(orderTrackingId: string): Observable<TransactionStatus> {
    const url = `${BASE_URL}/payments/status?orderTrackingId=${orderTrackingId}`;
    return this.read(url, this.headers) as unknown as Observable<TransactionStatus>;
  }


}
