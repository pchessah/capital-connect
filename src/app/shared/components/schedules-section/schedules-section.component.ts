import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { SharedModule } from "../../index";
import { SCHEDULE_TYPE } from "../../../features/business/interfaces/schedules.type";
import { BookingService } from '../../services/booking.service';
import { Observable, interval } from 'rxjs';
import { ModalComponent } from '../modal/modal.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PaymentService } from '../../services/payment.service';
import { switchMap, take, takeWhile } from 'rxjs/operators';
import { FeedbackService } from '../../../core';
import { FeedbackNotificationComponent } from '../../../core';
import { ChangeDetectorRef } from '@angular/core';
import { TransactionStatus } from '../../interfaces/payment';
import { tap, catchError,mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { CALENDLYEVENTID } from '../../../core';

@Component({
  selector: 'app-schedules-section',
  standalone: true,
  imports: [CommonModule, SharedModule, ModalComponent, FeedbackNotificationComponent],
  templateUrl: './schedules-section.component.html',
  styleUrls: ['./schedules-section.component.scss']
})
export class SchedulesSectionComponent implements OnInit {
  visible: boolean = false;
  orderTrackingId: string = '';
  createBooking$ = new Observable<TransactionStatus | null>();
  transactionStatusSubscription$ = new Observable<unknown>();
  private _bookingService = inject(BookingService);
  private _sanitizer = inject(DomSanitizer);
  booking: boolean = false;
  checkStatus: boolean = false;
  private _paymentService = inject(PaymentService);
  private _feedbackService = inject(FeedbackService);
  transactionStatus$ = new Observable<unknown>() ;
 

  message: { title: string, message: string, type: 'info' | 'success' | 'warning' | 'error' } | null = null;
  redirectUrl: SafeResourceUrl | null = null;
  pinned_schedules: SCHEDULE_TYPE[] = [
    { activity: 'Review with advisor', datetime: 'Today, 08:15 AM' }
  ];

  other_schedules: SCHEDULE_TYPE[] = [
    { activity: 'Meeting with capital connect', datetime: 'Today, 09:15 AM' }
  ];

  @Input() title!: string;
  @Input() subTitle!: string;
  @Input() body!: string;
  @Input() linkLabel!: string;
  @Input() link!: string;

  private cd =  inject(ChangeDetectorRef)
  message$ = new Observable<{ title: string, message: string, type: 'info' | 'success' | 'warning' | 'error' } | null>;

  constructor() { }

  ngOnInit() {
    this.message$ = this._feedbackService.message$;
  }



  checkPaymentStatus() {
    this.transactionStatus$ = this._paymentService.getTransactionStatus(this.orderTrackingId).pipe(
      tap((status: TransactionStatus) => {
        if (status.status === '200') {
          this.booking = true;
          this.checkStatus = false;
          this._feedbackService.success('Payment successful!', 'Payment Status');
        } else if (status.payment_status_description === 'pending') {
          this._feedbackService.warning('Payment pending.', 'Payment Status');
        } else {
          this._feedbackService.error('Payment failed.', 'Payment Status');
        }
      }),
      catchError((error: any) => {
        this._feedbackService.error('Error checking payment status.', 'Payment Status');
        return of(null); 
      }),
    );
  }



  createBooking() {
    this.visible = false
    this.createBooking$ = this._bookingService.createBooking({ calendlyEventId: CALENDLYEVENTID }).pipe(
      mergeMap((response: any) => {
        if (response && response.redirectUrl) {
          this.redirectUrl = this._sanitizer.bypassSecurityTrustResourceUrl(response.redirectUrl);
          this.visible = true;
          this.orderTrackingId = response.orderTrackingId;

          // Return an observable that emits the transaction status
          return interval(20000).pipe(
            take(3),
            switchMap(() => this._paymentService.getTransactionStatus(this.orderTrackingId)),
            takeWhile((status: TransactionStatus) => status?.status === '500' && this.visible, true),
            tap((status: TransactionStatus | null) => {
              if (status) {
                if (status.status === '500') {
                  this.booking = false;
                  this.checkStatus = true;
                } else if (status.status === '200') {
                  this.booking = true;
                  this.checkStatus = false;
                }
              }
            }),
            catchError((error: any) => {
              this._feedbackService.error('Error checking transaction status', error);
              return of(null); 
            })
          );
        } else {
          return of(null); 
        }
      }),
      catchError((error: any) => {
        this._feedbackService.error('Error creating booking', error);
        return of(null); 
      })
    );
  }


}
