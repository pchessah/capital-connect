import { Component,inject } from '@angular/core';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { BookingService } from '../../../shared/services/booking.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from "@angular/common";
import { Observable , interval,Subscription} from 'rxjs';
import { PaymentService } from '../../../shared/services/payment.service';
import { TransactionStatus } from '../../../shared/services/payment.service';
import { switchMap ,take, takeWhile } from 'rxjs/operators';



@Component({
  selector: 'app-pro-badge',
  standalone: true,
  imports: [CommonModule, ModalComponent],
  templateUrl: './pro-badge.component.html',
  styleUrl: './pro-badge.component.scss'
})
export class ProBadgeComponent {
  visible:boolean = false;
  createBooking$ = new Observable<unknown>();
  private transactionStatusSubscription: Subscription | null = null;
  private _bookingService = inject(BookingService)
  private _sanitizer = inject(DomSanitizer); 
  private _paymentService = inject(PaymentService)
  redirectUrl: SafeResourceUrl | null = null;
  booking : boolean = false;


  constructor(){} 
  

  createBooking() {
    this.createBooking$ = this._bookingService.createBooking({ calendlyEventId: 'ueiuwiiwu' });
    this.createBooking$.subscribe({
      next: (response: any) => {
        if (response && response.redirectUrl) {
          this.redirectUrl = this._sanitizer.bypassSecurityTrustResourceUrl(response.redirectUrl);
          this.visible = true;

          // Start checking transaction status every ten seconds
          const orderTrackingId = response.orderTrackingId; // Adjust based on actual response structure
          let checkCount = 0;

          this.transactionStatusSubscription = interval(10000)
            .pipe(
              take(3), // Limit to 3 intervals
              switchMap(() => this._paymentService.getTransactionStatus(orderTrackingId)),
              takeWhile((status: TransactionStatus) => {
                checkCount++;
                if (status?.message === "Request processed successfully") {
                  return false;
                }
                return checkCount < 3 && status?.message !== "Request processed successfully";
              }, true)
            )
            .subscribe({
              next: (status: TransactionStatus) => {
                console.log('Transaction Status:', status);
                this.booking = true
                this._bookingService.goToCalendly()
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
    });}



  ngOnDestroy() {
    // Clean up the subscription when the component is destroyed
    if (this.transactionStatusSubscription) {
      this.transactionStatusSubscription.unsubscribe();
    }
  }

}
