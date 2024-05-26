import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: 'setup', loadComponent: () => import('../../pages/setup/setup.component').then(c => c.SetupComponent)},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
}) 
export class OrganizationRoutingModule { }