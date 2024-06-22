import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmationDialogComponent } from '../../components/confirmation-dialog/confirmation-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationService {
  private _dialog = inject(MatDialog)
  confirm(message: string): Observable<boolean> {
    const dialogRef = this._dialog.open(ConfirmationDialogComponent, {
      width: '35vw',
      data: { message }
    });

    return dialogRef.afterClosed();
  }
}
