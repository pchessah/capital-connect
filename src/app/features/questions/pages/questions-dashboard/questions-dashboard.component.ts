import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionFormComponent } from '../../components/question-form/question-form.component';
import { NavbarComponent } from "../../../../core";
import { SharedModule } from '../../../../shared';
import { SubSectionFormComponent } from '../../components/sub-section-form/sub-section-form.component';
import { SectionFormComponent } from '../../components/section-form/section-form.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-questions-dashboard',
  standalone: true,
  imports: [SharedModule, NavbarComponent, QuestionFormComponent, SectionFormComponent, CommonModule, SubSectionFormComponent],
  templateUrl: './questions-dashboard.component.html',
  styleUrl: './questions-dashboard.component.scss'
})
export class QuestionsDashboardComponent {

  private _router = inject(Router)

  addSection() {
    this._router.navigateByUrl('questions/section')
  }




 


}
