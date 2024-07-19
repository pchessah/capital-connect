import { Component,inject } from '@angular/core';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from "@angular/common";
import { Observable , interval,Subscription} from 'rxjs';
import { PaymentService } from '../../../shared/services/payment.service';
import { TransactionStatus } from '../../../shared/services/payment.service';
import { switchMap ,take, takeWhile } from 'rxjs/operators';
import { BookingService } from '../../../shared/services/booking.service';
import { FeedbackService } from '../../services/feedback/feedback.service';



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


  constructor(){} 


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
    this.createBooking$ = this._bookingService.createBooking({ calendlyEventId: 'ueiuwiiwu' });
    this.createBooking$.subscribe({
      next: (response: any) => {
        if (response && response.redirectUrl) {
          this.redirectUrl = this._sanitizer.bypassSecurityTrustResourceUrl(response.redirectUrl);
          this.visible = true;

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
                return checkCount < 3 && status?.message !== "Request processed successfully";
              }, true)
            );

          (this.transactionStatusSubscription$ as Observable<TransactionStatus>).subscribe({
            next: (status: TransactionStatus) => {
              console.log('Transaction Status:', status.status);
              if (status.status === "500") {
                this.booking = false;
                this.checkStatus = true;
              } else if (status.status === "200") {
                this.booking = true;
                this.checkStatus = false;
              }
            },
            error: (error: any) => {
              console.error('Error checking transaction status', error);
            }
          });
        }
      },
      error: (error: any) => {
        console.error('Error creating booking', error);
      }
    });
  }



}
