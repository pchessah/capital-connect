import { Routes } from '@angular/router';
import { isLoggedInCanActivateChildGuard, isLoggedInCanActivateGuard } from './shared/guards/isLoggedIn.guard';

export const routes: Routes = [
  {
    path: '', redirectTo: '/landing', pathMatch: 'full'
  },
  {
    path: 'landing',
    loadChildren: () => import('./features/landing/modules/landing/landing.routing.module').then(m => m.LandingRoutingModule)
  },
  {
    path: 'organization',
    loadChildren: () => import('./features/organization/modules/organization/organization.routing').then(m => m.OrganizationRoutingModule),
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
