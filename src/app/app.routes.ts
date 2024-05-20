import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/modules/auth.routing.module').then(m => m.AppRoutingModule)
  },
  {
    path: '', redirectTo: '/auth', pathMatch: 'full'
  }
];
