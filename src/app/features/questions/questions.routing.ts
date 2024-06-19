import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: 'dashboard', loadComponent: () => import('./pages/questions-dashboard/questions-dashboard.component').then(c => c.QuestionsDashboardComponent)},
  { path: 'dashboard/:id', loadComponent: () => import('./pages/questions-dashboard/questions-dashboard.component').then(c => c.QuestionsDashboardComponent)},

  { path: 'section', loadComponent: () => import('./components/section-form/section-form.component').then(c => c.SectionFormComponent)},
  { path: 'section/:id', loadComponent: () => import('./components/section-form/section-form.component').then(c => c.SectionFormComponent)},

  { path: 'sub-section', loadComponent: () => import('./components/sub-section-form/sub-section-form.component').then(c => c.SubSectionFormComponent)},
  { path: 'sub-section/:id', loadComponent: () => import('./components/sub-section-form/sub-section-form.component').then(c => c.SubSectionFormComponent)},

  { path: 'questions' , loadComponent: () => import('./components/question-form/question-form.component').then(c => c.QuestionFormComponent)},
  { path: 'questions/:id' , loadComponent: () => import('./components/question-form/question-form.component').then(c => c.QuestionFormComponent)},
  
  { path: '', redirectTo: '/questions/dashboard' , pathMatch: 'full'},
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class QuestionsRoutingModule { }