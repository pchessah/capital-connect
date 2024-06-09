import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: 'dashboard', loadComponent: () => import('./pages/questions-dashboard/questions-dashboard.component').then(c => c.QuestionsDashboardComponent)},
  { path: '', redirectTo: '/questions/dashboard' , pathMatch: 'full'},
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionsRoutingModule { }