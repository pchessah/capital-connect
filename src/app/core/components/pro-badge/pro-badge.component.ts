import { Component,inject } from '@angular/core';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from "@angular/common";
import { Observable , interval,Subscription} from 'rxjs';
import { PaymentService } from '../../../shared/services/payment.service';
import { switchMap ,take, takeWhile } from 'rxjs/operators';
import { BookingService } from '../../../shared/services/booking.service';
import { FeedbackService } from '../../services/feedback/feedback.service';
import { ChangeDetectorRef } from '@angular/core';
import { TransactionStatus } from '../../../shared/interfaces/payment';



@Component({
  selector: 'app-pro-badge',
  standalone: true,
  imports: [CommonModule, ModalComponent],
  templateUrl: './pro-badge.component.html',
  styleUrl: './pro-badge.component.scss'
})
export class ProBadgeComponent {
  visible:boolean = false;
  orderTrackingId: string = ''
  createBooking$ = new Observable<unknown>();
  transactionStatusSubscription$ = new Observable<unknown>();
  private _bookingService = inject(BookingService)
  private _sanitizer = inject(DomSanitizer); 
  private _paymentService = inject(PaymentService)
  private _feedbackService = inject(FeedbackService)
  redirectUrl: SafeResourceUrl | null = null;
  booking : boolean = false;
  subscription!: Subscription;
  checkStatus: boolean = false
  message: { title: string, message: string, type: 'info' | 'success' | 'warning' | 'error' } | null = null;
  cd: ChangeDetectorRef | undefined;

  constructor(){} 

  ngOnInit() {
    this._feedbackService.message$
      .subscribe((message: { title: string, message: string, type: 'info' | 'success' | 'warning' | 'error' } | null) => {
        this.message = message;
        if (this.cd) {
          this.cd.detectChanges();
        }
      });
  }



  checkPaymentStatus() {
    this._paymentService.getTransactionStatus(this.orderTrackingId)
      .subscribe((status: TransactionStatus) => {
        if (status.status === '200') {
          this.booking = true;
          this.checkStatus = false;
          this.visible = false
          this._feedbackService.success('Payment successful!', 'Payment Status');
        } else if (status.payment_status_description === 'pending') {
          this._feedbackService.warning('Payment pending.', 'Payment Status');
        } else {
          this._feedbackService.error('Payment failed.', 'Payment Status');
        }
      }, (error: any) => {
        this._feedbackService.error('Error checking payment status.', 'Payment Status');
      });
  }





  createBooking() {
    this.visible = false
    this.createBooking$ = this._bookingService.createBooking({ calendlyEventId: 'ueiuwiiwu' });
    this.createBooking$.subscribe({
      next: (response: any) => {
        if (response && response.redirectUrl) {
          this.redirectUrl = this._sanitizer.bypassSecurityTrustResourceUrl(response.redirectUrl);
          this.visible = true;  // Ensure modal is shown

          // Start checking transaction status every twenty seconds
          const orderTrackingId = response.orderTrackingId;
          this.orderTrackingId = response.orderTrackingId;
          let checkCount = 0;

          this.transactionStatusSubscription$ = interval(20000)
            .pipe(
              take(3), // Limit to 3 intervals
              switchMap(() => this._paymentService.getTransactionStatus(orderTrackingId)),
              takeWhile((status: TransactionStatus) => {
                checkCount++;
                return checkCount < 3 && status?.status === "500" && this.visible;
              }, true)
            );

          (this.transactionStatusSubscription$ as Observable<TransactionStatus>).subscribe({
            next: (status: TransactionStatus) => {
              if (status.status === "500") {
                this.booking = false;
                this.checkStatus = true;
              } else if (status.status === "200") {
                this.booking = true;
                this.checkStatus = false;
              }
            },
            error: (error: any) => {
              this._feedbackService.error('Error checking transaction status', error);
            }
          });
        }
      },
      error: (error: any) => {
        this._feedbackService.error('Error creating booking', error);
      }
    });
  }
  




}
