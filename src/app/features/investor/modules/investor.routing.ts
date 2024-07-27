import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', loadComponent: () => import('../pages/dashboard/dashboard.component').then(c => c.DashboardComponent) },
  { path: 'onboarding', loadComponent: () => import('../pages/onboarding/onboarding.component').then(c => c.OnboardingComponent) },
  { path: 'profile', loadComponent: () => import('../pages/InvestorProfile/InvestorProfile.component').then(c => c.InvestorProfile) },


]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvestorRoutingModule { }
