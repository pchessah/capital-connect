import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: 'financials', loadComponent: () => import('../pages/financials/financials.component').then(c => c.FinancialsComponent)},
  { path: 'investor-eligibility', loadComponent: () => import('../pages/investor-eligibility/investor-eligibility.component').then(c =>c.InvestorEligibilityComponent)},
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
}) 
export class BusinessROutingModule { }