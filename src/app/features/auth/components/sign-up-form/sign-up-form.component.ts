import { Component, inject } from '@angular/core';
import { AuthModule } from '../../modules/auth.module';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { tap } from 'rxjs'
import { PASSWORD_STRENGTH } from '../../../../shared/interfaces/password-strength.enum';

@Component({
  selector: 'app-sign-up-form',
  standalone: true,
  imports: [CommonModule, AuthModule, FormsModule, ReactiveFormsModule],
  templateUrl: './sign-up-form.component.html',
  styleUrl: './sign-up-form.component.scss'
})
export class SignUpFormComponent {

  private _formBuilder = inject(FormBuilder);

  signUpForm = this._formBuilder.group({
    accountType: ['User', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    confirmPassword: ['']
  })

  listenToFormChanges$ = this.signUpForm.valueChanges.pipe(
    tap(formVals => {
      !!formVals.password?.length && !!formVals.confirmPassword?.length ? this._updatePasswordValidationChecks(formVals.password as string, formVals.email as string, formVals.confirmPassword as string)
                                                                        : this.passwordIsValid = false;
    })
  );

  passwordIsValid = false;
  password_validation_checks: { check: string; isValid?: boolean; }[] = [];

   private _updatePasswordValidationChecks(password: string, email: string, confirmPassword: string) {

    this.password_validation_checks = [
      {
        check: 'Password Strength',
        isValid: this._getPasswordStrength(password) === PASSWORD_STRENGTH.STRONG || 
                 this._getPasswordStrength(password) === PASSWORD_STRENGTH.MEDIUM
      },
      {
        check: 'Cannot contain your name or email address',
        isValid:  !password.includes(email)
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
        isValid:password === confirmPassword
      }
    ];
    

    //TODO: @j-netcom-dev Check for  passwords will change here
    this.passwordIsValid = password === confirmPassword
    // this.passwordIsValid = this.password_validation_checks.map(check => check.isValid).every(check => !!check)

  }
  private _getPasswordStrength(password: string): PASSWORD_STRENGTH {
    if (password.length >= 12 && /[A-Z]/.test(password) && /[0-9]/.test(password) && /[!@#$%^&*]/.test(password)) {
      return PASSWORD_STRENGTH.STRONG;
    } else if (password.length >= 8) {
      return  PASSWORD_STRENGTH.MEDIUM;
    } else {
      return  PASSWORD_STRENGTH.WEAK
    }
  }

  isTouched(formControlName:string) {
    return this.signUpForm.get(formControlName)?.touched

  }

  isDirty(formControlName:string){
    return this.signUpForm.get(formControlName)?.dirty
  }

  isTouchedOrDirty(formControlName:string){
    return (this.isDirty(formControlName) || this.isTouched(formControlName))  
  }

  isValid(formControlName:string){
    return  this.signUpForm.get(formControlName)?.valid
  }

  get getEmailFieldError(){
    return this.signUpForm.get('email')?.errors?.['required']
  }

  get passwordsAreSame () {
    return this.signUpForm.get('password')?.value === this.signUpForm.get('confirmPassword')?.value
  }

  submitForm() {
    const formValue = this.signUpForm.value;
    debugger
  }
}
