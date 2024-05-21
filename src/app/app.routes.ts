import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'landing',
    loadChildren: () => import('./features/landing/modules/landing/landing.routing.module').then(m => m.LandingRoutingModule)
  },
  {
    path: '', redirectTo: '/landing', pathMatch: 'full'
  }
];
