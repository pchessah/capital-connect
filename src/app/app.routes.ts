import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'landing',
    loadChildren: () => import('./features/landing/modules/landing/landing.routing.module').then(m => m.LandingRoutingModule)
  },
  
  {
    path: '', redirectTo: '/landing', pathMatch: 'full'
  },
  
  {
    path: 'organization',
    loadChildren: () =>import('./features/organization/modules/organization/organization.routing').then(m =>m.OrganizationRoutingModule),

  },

  {
    path: 'business',
    loadChildren: () =>import('./features/business/modules/business.routing').then(m =>m.BusinessROutingModule),

  },
];
