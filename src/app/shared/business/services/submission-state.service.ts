import { inject, Injectable } from '@angular/core';
import { SubmissionService } from './submission.service';
import { AuthStateService } from '../../../features/auth/services/auth-state.service';
import { BehaviorSubject, EMPTY, tap } from 'rxjs';
import { UserSubmissionResponse } from '../../interfaces/submission.interface';
import { LoadingService } from '../../../core';

@Injectable({ providedIn: 'root' })
export class SubMissionStateService {

  private _submissionService = inject(SubmissionService);
  private _authStateService = inject(AuthStateService);

  private _currentUserId = this._authStateService.currentUserId()  && this._authStateService.currentUserId() > 0 ? this._authStateService.currentUserId()  : Number(sessionStorage.getItem('userId'));

  private _currentUserSubmissionSrc$$ = new BehaviorSubject<UserSubmissionResponse[]>([]);
  private _loadingService = inject(LoadingService)

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

  getUserSubmissionsScore() {
    return this._submissionService.getSubmissionsScores(this._currentUserId).pipe(tap(res => {
      this._loadingService.setLoading(true)
    }));
  }

}
