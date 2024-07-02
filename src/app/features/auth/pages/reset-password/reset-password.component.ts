import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Observable, of, switchMap, tap } from 'rxjs';
import { FeedbackService } from '../../../../core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'primeng/api';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FORM_TYPE, PASSWORD_STRENGTH } from '../../interfaces/auth.interface';
import {WelcomeTemplateComponent} from "../../../../shared/components/welcome-template/welcome-template.component";

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, SharedModule, ReactiveFormsModule, WelcomeTemplateComponent],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
  private _router = inject(Router);
  private _activatedRoute = inject(ActivatedRoute);
  private _authService = inject(AuthService);
  private _feedbackService = inject(FeedbackService);
  private _formBuilder = inject(FormBuilder)

  resetPassword$ = new Observable();

  resetPasswordForm = this._formBuilder.group({
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required]
  })

  listenToFormChanges$ = this.resetPasswordForm.valueChanges.pipe(
    tap(formVals => {
      !!formVals.password?.length && !!formVals.confirmPassword?.length ? this._updatePasswordValidationChecks(formVals.password as string, formVals.confirmPassword as string)
        : this.passwordIsValid = false;
    })
  );
  passwordIsValid = false;
  password_validation_checks: { check: string; isValid: boolean; }[] = [];
  token: any;

  isTouchedOrDirty(formControlName: string) {
    const fieldIsTouched = this.resetPasswordForm.get(formControlName)?.touched;
    const fieldIsDirty = this.resetPasswordForm.get(formControlName)?.dirty;
    return fieldIsTouched || fieldIsDirty;
  }

  isValid(formControlName: string) {
    return this.resetPasswordForm.get(formControlName)?.valid;
  }

  initRoute$ = this._activatedRoute.params.pipe(tap(params => {
    this.token = params['token']
    if(!this.token) this._router.navigateByUrl('/landing')
  }))

  private _getPasswordStrength(password: string): PASSWORD_STRENGTH {
    if (password.length >= 12 && /[A-Z]/.test(password) && /[0-9]/.test(password) && /[!@#$%^&*]/.test(password)) {
      return PASSWORD_STRENGTH.STRONG;
    } else if (password.length >= 8) {
      return PASSWORD_STRENGTH.MEDIUM;
    } else {
      return PASSWORD_STRENGTH.WEAK
    }
  }

  private _updatePasswordValidationChecks(password: string, confirmPassword: string) {

    this.password_validation_checks = [
      {
        check: 'Password Strength',
        isValid: this._getPasswordStrength(password) === PASSWORD_STRENGTH.STRONG ||
          this._getPasswordStrength(password) === PASSWORD_STRENGTH.MEDIUM
      },
      {
        check: 'At least 8 characters',
        isValid: password.length >= 8
      },
      {
        check: 'Contains a number or a symbol',
        isValid: /[0-9!@#$%^&*]/.test(password)
      },
      {
        check: 'Passwords dont match',
        isValid: password === confirmPassword
      }
    ];

    //TODO: @j-netcom-dev Check for  passwords will change here
    this.passwordIsValid = password === confirmPassword
    // this.passwordIsValid = this.password_validation_checks.map(check => check.isValid).every(check => !!check)

  }

  get passwordsAreSame() {
    return this.resetPasswordForm.get('password')?.value === this.resetPasswordForm.get('confirmPassword')?.value
  }

  submitCredentials(){
    const val = {
      token: this.token,
      newPassword: this.resetPasswordForm.get('password')?.value as string,
      confirmNewPassword: this.resetPasswordForm.get('confirmPassword')?.value as string

    }
    this.resetPassword$ = this._authService.sendNewPassword(val).pipe(tap(res =>{
      this._feedbackService.success('Password reset successfully. Now Log in.')
      this.goHome()

    }))
  }

  goHome(){
    sessionStorage.clear();
    this._router.navigateByUrl('/landing', { state: { mode: FORM_TYPE.SIGNIN } })
  }

  protected readonly forms = FORM_TYPE;
}
