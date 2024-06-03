import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: 'financials', loadComponent: () => import('../pages/financials/financials.component').then(c => c.FinancialsComponent)},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
}) 
export class BusinessROutingModule { }