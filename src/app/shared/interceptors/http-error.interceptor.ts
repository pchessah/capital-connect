import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { EMPTY, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { FeedbackService } from '../../core';

export const HttpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const feedbackService = inject(FeedbackService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 403) {
        feedbackService.warning('You are unauthorized to perform the following action. Kindly Contact administrator.');
        return EMPTY;
      }

      let errorMessage = 'An unknown error occurred!';

      if (error?.error?.message) {
        errorMessage = `Error: ${error.error.message}`;
      } else {
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      feedbackService.error(errorMessage);
      return throwError(() => errorMessage);
    })
  );
};


// {
//   "message": "Invalid username or password",
//   "error": "Bad Request",
//   "statusCode": 400
// }
//TOD: @pchessah handle server error differently: Allow user to contact admin