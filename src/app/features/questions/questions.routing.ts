import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/saved-response/saved-response.component').then(c => c.SavedResponseComponent)},
  { path: 'dashboard', loadComponent: () => import('./pages/saved-response/saved-response.component').then(c => c.SavedResponseComponent)},

  { path: 'section', loadComponent: () => import('./pages/question-ui/question-ui.component').then(c => c.QuestionUiComponent)},

  { path: 'sub-section', loadComponent: () => import('./pages/question-subsection-ui/question-subsection-ui.component').then(c => c.QuestionSubsectionUiComponent)},
  { path: 'sub-section/:section-id', loadComponent: () => import('./pages/question-subsection-ui/question-subsection-ui.component').then(c => c.QuestionSubsectionUiComponent)},

  { path: 'create', loadComponent: () => import('./pages/question-type-ui/question-type-ui.component').then(c => c.QuestionTypeUiComponent)},
  { path: 'create/:sub-section-id', loadComponent: () => import('./pages/question-type-ui/question-type-ui.component').then(c => c.QuestionTypeUiComponent)},

  { path: 'add-answer' , loadComponent: () => import('./pages/answer-ui/answer-ui.component').then(c => c.AnswerUiComponent)},
  { path: 'add-answer/:question-id' , loadComponent: () => import('./pages/answer-ui/answer-ui.component').then(c => c.AnswerUiComponent)},
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class QuestionsRoutingModule { }
