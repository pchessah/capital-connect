import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService implements OnDestroy {

  private messageSubject = new BehaviorSubject<{ title: string, message: string, type: 'info' | 'success' | 'warning' | 'error' } | null>(null);
  message$ = this.messageSubject.asObservable();

  private destroy$ = new Subject<boolean>();

  private openMessage(title: string, message: string, type: 'info' | 'success' | 'warning' | 'error') {
    this.messageSubject.next({ title, message, type });

    setTimeout(() => {
      this.messageSubject.next(null);
    }, 3000);
  }

  info(message: string, title = 'Information') {
    this.openMessage(title, message, 'info');
  }

  success(message: string, title = 'Success') {
    this.openMessage(title, message, 'success');
  }

  warning(message: string, title = 'Warning') {
    this.openMessage(title, message, 'warning');
  }

  error(message: string, title = 'Error') {
    this.openMessage(title, message, 'error');
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
