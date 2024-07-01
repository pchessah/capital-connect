import { Routes } from '@angular/router';
import { isLoggedInCanActivateChildGuard, isLoggedInCanActivateGuard } from './shared/guards/isLoggedIn.guard';

export const routes: Routes = [
  {
    path: '', redirectTo: '/landing', pathMatch: 'full'
  },
  {
    path: 'landing',
    loadChildren: () => import('./features/landing/modules/landing/landing.routing.module').then(m => m.LandingRoutingModule),
    canActivate: [isLoggedInCanActivateGuard],
  },
  {
    path:'verify-email',
    loadComponent: () => import('./features/auth/pages/verify-email/verify-email.component').then(c => c.VerifyEmailComponent)


  },
  {
    path: 'organization',
    loadChildren: () => import('./features/organization/modules/organization/organization.routing').then(m => m.OrganizationRoutingModule),
    canActivate: [isLoggedInCanActivateGuard],
    canActivateChild: [isLoggedInCanActivateChildGuard]
  },
  {
    path: 'investor',
    loadChildren: () => import('./features/investor/modules/investor.routing').then(m => m.InvestorRoutingModule),
    canActivate: [isLoggedInCanActivateGuard],
    canActivateChild: [isLoggedInCanActivateChildGuard]
  },
  {
    path: 'business',
    loadChildren: () => import('./features/business/modules/business.routing').then(m => m.BusinessRoutingModule),
    canActivate: [isLoggedInCanActivateGuard],
    canActivateChild: [isLoggedInCanActivateChildGuard]
  },
  {
    path: 'questions',
    loadChildren: () => import('./features/questions/questions.routing').then(m => m.QuestionsRoutingModule),
    canActivate: [isLoggedInCanActivateGuard],
    canActivateChild: [isLoggedInCanActivateChildGuard]
  }
];
