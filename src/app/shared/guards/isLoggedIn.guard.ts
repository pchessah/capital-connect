import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChildFn, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthStateService } from '../../features/auth/services/auth-state.service';
import { FORM_TYPE } from '../../features/auth/interfaces/auth.interface';

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
  
  router.navigateByUrl('/landing',  { state: { mode: FORM_TYPE.SIGNIN } });
  return false;
}