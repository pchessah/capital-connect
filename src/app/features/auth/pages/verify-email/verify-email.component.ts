import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { SharedModule } from '../../../../shared';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FORM_TYPE } from '../../interfaces/auth.interface';
import { Observable, of, switchMap, tap } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { FeedbackService } from '../../../../core';
import {WelcomeTemplateComponent} from "../../../../shared/components/welcome-template/welcome-template.component";

@Component({
  selector: 'app-verify-email',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterModule, FormsModule, WelcomeTemplateComponent],
  templateUrl: './verify-email.component.html',
  styleUrl: './verify-email.component.scss'
})
export class VerifyEmailComponent {

  private _router = inject(Router);
  private _activatedRoute = inject(ActivatedRoute);
  private _authService = inject(AuthService);
  private _feedbackService = inject(FeedbackService);

  activeRouteData: { mode: string } = this._router.getCurrentNavigation()?.extras.state as any
  isWaitingForVerification = this.activeRouteData?.mode === 'unverified';

  initRoute$ = this._activatedRoute.queryParams.pipe(switchMap(params => {
    const token = params['token'];
    if (token) {
      return this._authService.verifyEmail(token);
    }
    return of(null);
  }), tap(res => {
    if (!res) {
      this.emailNotVerified = true;
    }
    else {
      this.goToLogin();
    }
  }))

  emailNotVerified = false;
  email = '';
  resend$ = new Observable();

  timerValue: number = 60;
  timerInterval: any;

  ngOnInit(): void {
    this.startTimer();
  }

  ngOnDestroy(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  startTimer(): void {
    this.timerInterval = setInterval(() => {
      if (this.timerValue > 0) {
        this.timerValue--;
      } else {
        this.isWaitingForVerification = false;
        clearInterval(this.timerInterval);
      }
    }, 1000);
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  goToLogin() {
    this._router.navigateByUrl('/', { state: { mode: FORM_TYPE.SIGNIN } });
  }

  resendEmail() {
    if (this.isValidEmail(this.email)) {
      this.resend$ = this._authService.resendVerification(this.email).pipe(tap(res => {
        this._feedbackService.success(res.message)
        this.timerValue = 60;
        this.startTimer();
        this.isWaitingForVerification = true
      }))
    }
  }

}
