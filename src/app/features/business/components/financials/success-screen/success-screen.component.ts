import {Component, inject} from '@angular/core';
import {AuthStateService} from "../../../../auth/services/auth-state.service";
import {SubmissionService} from "../../../../../shared";
import {Observable, tap} from "rxjs";
import {CommonModule} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {FeedbackService} from "../../../../../core";

@Component({
  selector: 'app-success-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './success-screen.component.html',
  styleUrl: './success-screen.component.scss'
})
export class SuccessScreenComponent {
  private  _router =inject(Router);
  private _feedBackService =inject(FeedbackService);
  private _authStateService =inject(AuthStateService);
  private _currentUserId: number =this._authStateService.currentUserId()
  private _submissionService =inject(SubmissionService);
  score$ =new Observable();
  calculateScore() {
    this.score$ =this._submissionService.calculateScoreOfUser(this._currentUserId).pipe(tap(res =>{
      this._feedBackService.info(`Your Score is: ${res.score}`, `Your Eligibility Score`)
    }));

  }

  goToInvestorEligibility(){
    this._router.navigateByUrl('/business/investor-eligibility')
  }
}
