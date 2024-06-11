import { inject, Injectable, OnDestroy } from '@angular/core';
import { FeedbackComponent } from '../../components/feedback/feedback.component';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService implements OnDestroy {

  private dialog = inject(MatDialog);

  private destroy$ = new Subject<boolean>();

  openDialog(title: string, message: string, type: 'info' | 'success' | 'warning' | 'error') {
    const ref = this.dialog.open(FeedbackComponent, {
      data: { title, message, type },
    });

    ref.afterOpened().pipe(takeUntil(this.destroy$)).subscribe(() => {
      setTimeout(() => {
        ref.close();
      }, 3000)
    })
  }

  info(message: string, title = 'Information') {
    this.openDialog(title, message, 'info');
  }

  success(message: string, title = 'Success') {
    this.openDialog(title, message, 'success');
  }

  warning(message: string, title = 'Warning') {
    this.openDialog(title, message, 'warning');
  }

  error(message: string, title = 'Error') {
    this.openDialog(title, message, 'error');
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }
}
