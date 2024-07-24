import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from "@angular/router";
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { EMPTY, throwError } from 'rxjs';
import { FeedbackService } from '../../core';

export const HttpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const feedbackService = inject(FeedbackService);
  const router = inject(Router)

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.error.statusCode === 403) {
        feedbackService.warning('You are unauthorized to perform the following action. Kindly Contact administrator.');
        return EMPTY;
      }
      if (isValidCompanyOwnerPath(error.url as string)) {
        if (error.error.statusCode === 404) {
          router.navigateByUrl('/organization/setup')
        }
        feedbackService.info('Kindly add your company details.')
        return EMPTY;
      }

      if (isValidAuthLoginPath(error.url as string)) {
        if (error.error.message.includes('Your email is not verified')) {
          router.navigateByUrl('/verify-email')
        }
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

function isValidCompanyOwnerPath(path: string): boolean {
  const regex = /^.+\/company\/owner\/\d+$/;
  return regex.test(path);
}

function isValidAuthLoginPath(path: string): boolean {
  return path.includes('login');
}


// {
//   "message": "Invalid username or password",
//   "error": "Bad Request",
//   "statusCode": 400
// }
//TOD: @pchessah handle server error differently: Allow user to contact admin
