// paypal.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseHttpService } from '../../core/http/base/base.http.service';
import { BASE_URL } from '../../core';

// const BASE_URL = 'https://pay.pesapal.com/v3/api';

interface AuthResponse {
  token: string;
  expiryDate: string;
}

interface OrderRequest {
  id: string;
  currency: string;
  amount: number;
  description: string;
  callback_url: string;
  notification_id: string;
  branch?: string;
  billing_address: {
    phone_number?: string;
    email_address?: string;
    country_code?: string;
    first_name?: string;
    middle_name?: string;
    last_name?: string;
    line_1?: string;
    line_2?: string;
    city?: string;
    state?: string;
    postal_code?: string;
    zip_code?: string;
  };
}

export interface TransactionStatus {
  payment_method: string;
  amount: number;
  created_date: string;
  confirmation_code: string;
  payment_status_description: string;
  description: string;
  message: string;
  payment_account: string;
  call_back_url: string;
  status_code: number;
  merchant_reference: string;
  currency: string;
  status:string;
}

interface OrderCancellation {
  order_tracking_id: string;
}

interface RefundRequest {
  confirmation_code: string;
  amount: number;
  username: string;
  remarks: string;
}

interface IPNRegistration {
  url: string;
  ipn_notification_type: string;
}

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

  submitOrder(request: OrderRequest): Observable<any> {
    const url = `${BASE_URL}/Transactions/SubmitOrderRequest`;
    return this.create(url, request, this.headers);
  }

  getTransactionStatus(orderTrackingId: string): Observable<TransactionStatus> {
    const url = `${BASE_URL}/payments/status?orderTrackingId=${orderTrackingId}`;
    return this.read(url, this.headers) as unknown as Observable<TransactionStatus>;
  }

  cancelOrder(request: OrderCancellation): Observable<any> {
    const url = `${BASE_URL}/Transactions/CancelOrder`;
    return this.create(url, request, this.headers);
  }

  requestRefund(request: RefundRequest): Observable<any> {
    const url = `${BASE_URL}/Transactions/RefundRequest`;
    return this.create(url, request, this.headers);
  }

  registerIPN(request: IPNRegistration): Observable<any> {
    const url = `${BASE_URL}/URLSetup/RegisterIPN`;
    return this.create(url, request, this.headers);
  }
}
