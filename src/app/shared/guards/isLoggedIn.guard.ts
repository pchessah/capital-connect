import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChildFn, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthStateService } from '../../features/auth/services/auth-state.service';

export const isLoggedInCanActivateGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return checkLogin()
}

export const isLoggedInCanActivateChildGuard: CanActivateChildFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return checkLogin()
}

function checkLogin() {
  const authStateService = inject(AuthStateService)
  const router = inject(Router)

  if (authStateService.isLoggedIn) {
    return true
  }
  router.navigate(['/landing']);

  return false;
}