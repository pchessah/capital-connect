import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/saved-response/saved-response.component').then(c => c.SavedResponseComponent) },
  { path: 'dashboard', loadComponent: () => import('./pages/saved-response/saved-response.component').then(c => c.SavedResponseComponent) },

  { path: 'section', loadComponent: () => import('./pages/create-section/create-section.component').then(c => c.CreateSectionComponent) },
  { path: 'section/:id', loadComponent: () => import('./pages/section/section.component').then(c => c.SectionComponent) },
  { path: 'section/:id/edit', loadComponent: () => import('./pages/edit-section/edit-section.component').then(c => c.EditSectionComponent) },
  { path: 'section/:id/add-subsection', loadComponent: () => import('./pages/create-subsection/create-subsection.component').then(c => c.CreateSubsectionComponent) },

  { path: 'sub-section', loadComponent: () => import('./pages/subsection/subsection.component').then(c => c.SubSectionComponent) },
  { path: 'sub-section/:id', loadComponent: () => import('./pages/subsection/subsection.component').then(c => c.SubSectionComponent) },
  { path: 'sub-section/:id/edit', loadComponent: () => import('./pages/edit-subsection/edit-subsection.component').then(c => c.EditSubsectionComponent) },
  { path: 'sub-section/:id/add-question', loadComponent: () => import('./pages/create-question/create-question.component').then(c => c.CreateQuestionComponent) },

  { path: 'single-question', loadComponent: () => import('./pages/question-type-ui/question-type-ui.component').then(c => c.QuestionTypeUiComponent) },
  { path: 'single-question/:id/add-answer', loadComponent: () => import('./pages/create-answer/create-answer.component').then(c => c.CreateAnswerComponent) },
  { path: 'single-question/:id/edit', loadComponent: () => import('./pages/edit-question/edit-question.component').then(c => c.EditQuestionComponent) },

  { path: 'answers', loadComponent: () => import('./pages/answer-ui/answer-ui.component').then(c => c.AnswerUiComponent) },
  { path: 'answers/:id', loadComponent: () => import('./pages/answer-ui/answer-ui.component').then(c => c.AnswerUiComponent) },
  { path: 'answers/:id/edit', loadComponent: () => import('./pages/edit-answer/edit-answer.component').then(c => c.EditAnswerComponent) },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class QuestionsRoutingModule { }
