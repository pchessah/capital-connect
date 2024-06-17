import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, finalize, tap } from 'rxjs/operators';
import { EMPTY, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { FeedbackService, LoadingService } from '../../core';
import { AuthService } from '../../features/auth/services/auth.service';

export const HttpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const feedbackService = inject(FeedbackService);
  const loadingService = inject(LoadingService);
  const authService = inject(AuthService);

  loadingService.isLoading.set(true);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {

      loadingService.isLoading.set(true);
      if (error.status === 403) {
        feedbackService.info('Your session has expired. Kindly login');
        authService.logout();
        loadingService.isLoading.set(false)
        return EMPTY;
      }

      let errorMessage = 'An unknown error occurred!';

      if (error?.error?.message) {
        errorMessage = `Error: ${error.error.message}`;
      } else {
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      feedbackService.error(errorMessage);
      loadingService.isLoading.set(false)
      return throwError(() => errorMessage);
    }),
    tap(() => loadingService.isLoading.set(false))
  );
};


// {
//   "message": "Invalid username or password",
//   "error": "Bad Request",
//   "statusCode": 400
// }
//TOD: @pchessah handle server error differently: Allow user to contact admin