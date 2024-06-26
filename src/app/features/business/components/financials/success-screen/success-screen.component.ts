import { Component, inject } from '@angular/core';
import { AuthStateService } from "../../../../auth/services/auth-state.service";
import { SubmissionService } from "../../../../../shared";
import { Observable, tap } from "rxjs";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { FeedbackService } from "../../../../../core";
import { BusinessPageService } from "../../../services/business-page/business.page.service";

@Component({
  selector: 'app-success-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './success-screen.component.html',
  styleUrl: './success-screen.component.scss'
})
export class SuccessScreenComponent {
  
  private _router = inject(Router);
  private _pageService = inject(BusinessPageService);
  private _authStateService = inject(AuthStateService);
  private _submissionService = inject(SubmissionService);
  private _feedBackService = inject(FeedbackService);

  private _currentUserId = this._authStateService.currentUserId();

  score$ = new Observable();
  calculateScore() {
    this.score$ = this._submissionService.calculateScoreOfUser(this._currentUserId).pipe(tap(res => {
      this._feedBackService.info(`Your Score is: ${res.score}`, `Your Eligibility Score`)
    }));

  }

  goToInvestorEligibility() {
    this._pageService.setCurrentPage(1);
    this._pageService.setCurrentStep(1);
    this._router.navigateByUrl('/business/investor-eligibility');
  }
}
