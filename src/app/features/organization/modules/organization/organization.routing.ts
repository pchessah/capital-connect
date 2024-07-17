import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { isAdminCanActivateChildGuard, isAdminCanActivateGuard } from '../../../../shared/guards/isAdminGuard';


const routes: Routes = [
  { path: 'setup', loadComponent: () => import('../../pages/setup/setup.component').then(c => c.SetupComponent) },
  { path: 'setup/:id', loadComponent: () => import('../../pages/setup/setup.component').then(c => c.SetupComponent) },
  { 
    path: 'list',
    loadComponent: () => import('../../pages/organization-list/organization-list.component').then(c => c.OrganizationListComponent),
    canActivate: [isAdminCanActivateGuard],
    canActivateChild: [isAdminCanActivateChildGuard]
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationRoutingModule { }