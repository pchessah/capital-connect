import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChildFn, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { AuthStateService } from '../../features/auth/services/auth-state.service';
import { Location } from '@angular/common';
import { FeedbackService } from '../../core';

export const isAdminCanActivateGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return checkIsAdmin();
}

export const isAdminCanActivateChildGuard: CanActivateChildFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return checkIsAdmin();
}

function checkIsAdmin() {
  const authStateService = inject(AuthStateService);
  const location = inject(Location);
  const feedBackService = inject(FeedbackService);

  if (authStateService.userIsAdmin) {
    return true;
  }

  feedBackService.warning('You are not authorized to view this page, Kindly contact the administrator.')

  location.back();
  return false;
}
