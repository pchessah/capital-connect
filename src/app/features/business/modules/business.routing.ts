import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', loadComponent: () => import('../pages/dashboard/dashboard.component').then(c => c.DashboardComponent) },
  { path: 'financials', loadComponent: () => import('../pages/financials/financials.component').then(c => c.FinancialsComponent) },
  { path: 'investor-eligibility', loadComponent: () => import('../pages/investor-eligibility/investor-eligibility.component').then(c => c.InvestorEligibilityComponent) },
  { path: 'investor-preparedness', loadComponent: () => import('../pages/investor-preparedness/investor-preparedness.component').then(c => c.InvestorPreparednessComponent) },
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessRoutingModule { }
