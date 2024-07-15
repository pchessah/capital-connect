import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/saved-response/saved-response.component').then(c => c.SavedResponseComponent) },
  { path: 'dashboard', loadComponent: () => import('./pages/saved-response/saved-response.component').then(c => c.SavedResponseComponent) },

  { path: 'sector', loadComponent: () => import('./pages/create-sector/create-sector.component').then(c => c.CreateSectorComponent) },
  { path: 'sector/:id', loadComponent: () => import('./pages/sector/sector.component').then(c => c.SectorComponent) },
  { path: 'sector/:id/edit', loadComponent: () => import('./pages/edit-sector/edit-sector.component').then(c => c.EditSectorComponent) },
  { path: 'sector/:id/add-subsector', loadComponent: () => import('./pages/create-subsector/create-subsector.component').then(c => c.CreateSubsectorComponent) },

  { path: 'sub-sector', loadComponent: () => import('./pages/subsector/subsector.component').then(c => c.SubSectorComponent) },
  { path: 'sub-sector/:id', loadComponent: () => import('./pages/subsector/subsector.component').then(c => c.SubSectorComponent) },
  { path: 'sub-sector/:id/edit', loadComponent: () => import('./pages/edit-subsector/edit-subsector.component').then(c => c.EditSubSectorComponet) }

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SectorsRoutingModule { }
