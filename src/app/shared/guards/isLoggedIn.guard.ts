import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChildFn, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthStateService } from '../../features/auth/services/auth-state.service';
import { FORM_TYPE } from '../../features/auth/interfaces/auth.interface';

export const isLoggedInCanActivateGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return checkLogin(route)
}

export const isLoggedInCanActivateChildGuard: CanActivateChildFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return checkLogin(route)
}



function checkLogin(route: ActivatedRouteSnapshot) {
  const authStateService = inject(AuthStateService)
  const router = inject(Router)

  const url = route.url[0]?.path;

  if( url && url.includes('landing')){
    if (authStateService.isLoggedIn) {
      router.navigateByUrl('/organization/setup')
    }
    return true
  }

  if (authStateService.isLoggedIn) {
    return true
  }
  
  router.navigateByUrl('/landing',  { state: { mode: FORM_TYPE.SIGNIN } });
  return false;
}
