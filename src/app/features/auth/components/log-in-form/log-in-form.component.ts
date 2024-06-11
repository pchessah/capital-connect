import { Component, inject } from '@angular/core';
import { AuthModule } from '../../modules/auth.module';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { AuthService } from '../../services/auth.service';
import { catchError, EMPTY, Observable, tap } from 'rxjs';
import { AuthStateService } from '../../services/auth-state.service';

@Component({
  selector: 'app-log-in-form',
  standalone: true,
  imports: [CommonModule, AuthModule, FormsModule, ReactiveFormsModule],
  templateUrl: './log-in-form.component.html',
  styleUrl: './log-in-form.component.scss'
})
export class LogInFormComponent {
  private _formBuilder = inject(FormBuilder);
  private _router = inject(Router);
  private _authService = inject(AuthService);
  private _authStateService = inject(AuthStateService);

  logIn$ = new Observable<unknown>();

  signInForm = this._formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  })

  isTouchedOrDirty(formControlName: string) {

    const fieldIsTouched = this.signInForm.get(formControlName)?.touched;
    const fieldIsDirty = this.signInForm.get(formControlName)?.dirty;
    return fieldIsTouched || fieldIsDirty;
  }

  isValid(formControlName: string) {
    return this.signInForm.get(formControlName)?.valid;
  }

  submitCredentials() {
    const credentials = { username: this.signInForm.value.email as string, password: this.signInForm.value.password as string };
    this.logIn$ = this._authService.login(credentials).pipe(tap((res: { access_token: string }) => {
      const accessToken = res.access_token
      this._authStateService.setToken(accessToken)
      this._router.navigateByUrl('/organization/setup')
    }), catchError((err) => {
      console.error(err)
      return EMPTY
    }))


  }


}
