import { inject, Injectable } from '@angular/core';
import { SubmissionService } from './submission.service';
import { AuthStateService } from '../../../features/auth/services/auth-state.service';
import { BehaviorSubject, EMPTY, tap } from 'rxjs';
import { UserSubmissionResponse } from '../../interfaces/submission.interface';
import { LoadingService } from '../../../core';
import { getInvestorEligibilitySubsectionIds } from './onboarding.questions.service';
import { CompanyStateService } from '../../../features/organization/services/company-state.service';
import { INVESTOR_PREPAREDNESS_SUBSECTION_IDS } from './onboarding.questions.service';

@Injectable({ providedIn: 'root' })
export class SubMissionStateService {

  private _submissionService = inject(SubmissionService);
  private _authStateService = inject(AuthStateService);

  private _currentUserId = this._authStateService.currentUserId()  && this._authStateService.currentUserId() > 0 ? this._authStateService.currentUserId()  : Number(sessionStorage.getItem('userId'));

  private _currentUserSubmissionSrc$$ = new BehaviorSubject<UserSubmissionResponse[]>([]);
  private _loadingService = inject(LoadingService)
  private _companyService = inject(CompanyStateService)

  currentUserSubmission$ = this._currentUserSubmissionSrc$$.asObservable();

  get currentUserSubmission() {
    return this._currentUserSubmissionSrc$$.value;
  }

  setCurrentUserSubmission(submission: UserSubmissionResponse[]) {
    this._currentUserSubmissionSrc$$.next(submission)
  }


  clearUserSubmissionResponse() {
    return this._currentUserSubmissionSrc$$.next([])
  }

  getUserSubmissions() {
    const userId = this._currentUserId && this._currentUserId > 0 ? this._currentUserId : Number(sessionStorage.getItem('userId'));
    if (userId) {
      return this._submissionService.fetchSubmissionsByUser(userId).pipe(tap(res => {
        this.setCurrentUserSubmission(res);
      }));
    }
    return EMPTY;
  }

  getUserSubmissionsPerSection() {
    const sectionId = getInvestorEligibilitySubsectionIds(this._companyService.currentCompany.growthStage)
    const userId = this._currentUserId && this._currentUserId > 0 ? this._currentUserId : Number(sessionStorage.getItem('userId'));
    if (userId) {
      return this._submissionService.fetchSubmissionsByUserPerSection(userId,sectionId.ID).pipe(tap(res => {
        this.setCurrentUserSubmission(res);
      }));
    }
    return EMPTY;
  }

  getUserPreparednessSubmissionsPerSection() {
    const userId = this._currentUserId && this._currentUserId > 0 ? this._currentUserId : Number(sessionStorage.getItem('userId'));
    if (userId) {
      return this._submissionService.fetchSubmissionsByUserPerSection(userId,INVESTOR_PREPAREDNESS_SUBSECTION_IDS.ID).pipe(tap(res => {
        this.setCurrentUserSubmission(res);
      }));
    }
    return EMPTY;
  }

  getUserSubmissionsScore() {
    return this._submissionService.getSubmissionsScores(this._currentUserId).pipe(tap(res => {
      this._loadingService.setLoading(true)
    }));
  }

}
