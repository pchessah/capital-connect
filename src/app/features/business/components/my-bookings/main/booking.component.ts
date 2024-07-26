import { Component, inject } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { NavbarComponent } from "../../../../../core";
import { BookingService } from '../../../../../shared/services/booking.service';
import { PaginationService } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { Booking } from '../../../../../shared/interfaces/booking';
import { Observable, of } from 'rxjs';
import { PaymentService } from '../../../../../shared/services/payment.service';
import { TransactionStatus } from '../../../../../shared/interfaces/payment';
import { FeedbackService } from '../../../../../core';
import { tap, catchError } from 'rxjs/operators';


@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [
    MatIcon,
    NavbarComponent,
    CommonModule,
    NgxPaginationModule
  ],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss',
  providers: [PaginationService]
})
export class BookingComponent {
  bookings: Booking[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 8;
  totalItems: number = 0;
  pagedBookings: any[] = [];
  showNewBookingForm: boolean = false;
  private _paymentService = inject(PaymentService)
  private _feedbackService = inject(FeedbackService)

  private _bookingService = inject(BookingService)
  transactionStatus$ = new Observable<unknown>();

  message$ = new Observable<{ title: string, message: string, type: 'info' | 'success' | 'warning' | 'error' } | null>;

  ngOnInit() {
    this.message$ = this._feedbackService.message$;
  }




  constructor(private bookingService: BookingService) { }

  bookings$ = this._bookingService.getBookings(8, 10).pipe(tap(res => {
    this.bookings = res
    this.totalItems = res.length;
  }))


  pageChange(page: number): void {
    this.currentPage = page;
    this.bookings$ = this._bookingService.getBookings(this.currentPage, this.itemsPerPage).pipe(
      tap(res => {
        this.bookings = res;
        this.totalItems = res.length; // Update totalItems if necessary
      })
    );
  }

  onPageChange(page: number) {
    this.currentPage = page;
  }

  checkStatus1(orderTrackingId: string) {
    // Implement the status check logic here
    console.log('Checking status for:', orderTrackingId);
  }

  checkStatus(orderTrackingId: string) {
    this.transactionStatus$ = this._paymentService.getTransactionStatus(orderTrackingId).pipe(
      tap((status: TransactionStatus) => {
        if (status.status === '200') {
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

  addNewBooking() {
    // Implement the logic to navigate to the page for adding a new booking
  }

  toggleNewBookingForm(): void {
    this.showNewBookingForm = !this.showNewBookingForm;
  }

  onBookingCreated(newBooking: any): void {
    this.bookings.push(newBooking);
    this.pageChange(this.currentPage);
  }



}
