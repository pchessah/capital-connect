import {Component, inject, Input} from '@angular/core';
import { CommonModule } from "@angular/common";
import { SharedModule } from "../../index";
import { SCHEDULE_TYPE } from "../../../features/business/interfaces/schedules.type";
import { BookingService } from '../../services/booking.service';
import { Observable , interval,Subscription} from 'rxjs';
import { ModalComponent } from '../modal/modal.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PaymentService } from '../../services/payment.service';
import { TransactionStatus } from '../../services/payment.service';
import { switchMap ,take, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-schedules-section',
  standalone: true,
  imports: [CommonModule, SharedModule, ModalComponent],
  templateUrl: './schedules-section.component.html',
  styleUrl: './schedules-section.component.scss'
})

export class SchedulesSectionComponent {
  visible:boolean = false;
  createBooking$ = new Observable<unknown>();
  private transactionStatusSubscription: Subscription | null = null;
  private _bookingService = inject(BookingService)
  private _sanitizer = inject(DomSanitizer); 
  booking : boolean = false
  private _paymentService = inject(PaymentService)
  redirectUrl: SafeResourceUrl | null = null;
  pinned_schedules: SCHEDULE_TYPE[] = [
    { activity: 'Review with advisor', datetime: 'Today, 08:15 AM' }
  ]

  other_schedules: SCHEDULE_TYPE[] = [
    { activity: 'Meeting with capital connect', datetime: 'Today, 09:15 AM' }
  ]

  @Input() title!:string;
  @Input() subTitle!:string;
  @Input() body!:string;
  @Input() linkLabel!:string;
  @Input() link!:string;

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
