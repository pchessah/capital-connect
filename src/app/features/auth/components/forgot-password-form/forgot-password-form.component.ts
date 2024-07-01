import {Component, EventEmitter, inject, Output} from '@angular/core';
import { CommonModule } from "@angular/common";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {catchError, EMPTY, Observable, tap} from "rxjs";

@Component({
  selector: 'app-forgot-password-form',
  standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
  templateUrl: './forgot-password-form.component.html',
  styleUrl: './forgot-password-form.component.scss'
})
export class ForgotPasswordFormComponent {
  @Output() goToLoginEvent = new EventEmitter();
  private _formBuilder = inject(FormBuilder);
  private _authService = inject(AuthService);

  requestPassword$ = new Observable<unknown>();

  newPasswordRequestForm = this._formBuilder.group({
    email: ['', Validators.required],
  })

  isTouchedOrDirty(formControlName: string) {
    const fieldIsTouched = this.newPasswordRequestForm.get(formControlName)?.touched;
    const fieldIsDirty = this.newPasswordRequestForm.get(formControlName)?.dirty;
    return fieldIsTouched || fieldIsDirty;
  }

  isValid(formControlName: string) {
    return this.newPasswordRequestForm.get(formControlName)?.valid;
  }

  submitRequest() {

    // this.requestPassword$ = this._authService.forgotPassword(this.newPasswordRequestForm.value.email as string)

  }
  gotToLogin(){
    this.goToLoginEvent.emit()
  }
}
