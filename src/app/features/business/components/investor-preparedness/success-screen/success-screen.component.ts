import {Component, inject} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {Observable, tap} from "rxjs";
import {AuthStateService} from "../../../../auth/services/auth-state.service";
import {SubmissionService} from "../../../../../shared";
import {FeedbackService} from "../../../../../core";
import { CommonModule} from "@angular/common";
import {BusinessPageService} from "../../../services/business-page/business.page.service";

@Component({
  selector: 'app-success-screen',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule
  ],
  templateUrl: './success-screen.component.html',
  styleUrl: './success-screen.component.scss'
})
export class SuccessScreenComponent {
  score$ =new Observable();
  private  _router =inject(Router);
  private _pageService = inject(BusinessPageService);
  private _authStateService =inject(AuthStateService);
  private _currentUserId: number =this._authStateService.currentUserId();
  private _submissionService =inject(SubmissionService);
  private _feedBackService =inject(FeedbackService);

  calculateScore() {
    this.score$ =this._submissionService.calculateScoreOfUser(this._currentUserId).pipe(tap(res =>{
      this._feedBackService.info(`Your Score is: ${res.score}`, `Your Eligibility Score`)
    }));

  }
  goToDashboard() {
    this._pageService.setCurrentPage(1);
    this._pageService.setCurrentStep(1);
    this._router.navigateByUrl('/business');
  }
}
