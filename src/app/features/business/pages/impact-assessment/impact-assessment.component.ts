import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from "@angular/router";
import { BusinessPageService } from '../../services/business-page/business.page.service';
import { LayoutComponent } from '../../../../shared/business/layout/layout.component';

import { IndexLayoutComponent } from '../../../../shared/business/components/index-layout/index-layout.component';
import { FormsLayoutComponent } from '../../../../shared/business/components/forms-layout/forms-layout.component';

import { SubMissionStateService } from "../../../../shared";
import { IndexComponent } from '../../components/impact-assessment/index/index.component';
import { StepsComponent } from '../../components/impact-assessment/steps/steps.component';
import { SuccessScreenComponent } from '../../components/impact-assessment/success-screen/success-screen.component';

@Component({
  selector: 'app-im',
  standalone: true,
  imports: [CommonModule, LayoutComponent, IndexLayoutComponent, FormsLayoutComponent, IndexComponent, StepsComponent, SuccessScreenComponent],
  templateUrl: './impact-assessment.component.html',
  styleUrl: './impact-assessment.component.scss'
})
export class ImpactAssessmentComponent {
  private _router = inject(Router)
  constructor(private screenService: BusinessPageService) { }

  currentPage$ = this.screenService.current_page$
  private _submissionStateService = inject(SubMissionStateService)
  // @ts-ignore
  private screenService = inject(BusinessPageService)

  usersSubmission$ = this._submissionStateService.getUserSubmissions();

  activeRouteData: { data: { page: number, step: number } } = this._router.getCurrentNavigation()?.extras.state as any

  ngOnInit() {
    this.screenService.setCurrentPage(this.activeRouteData?.data?.page || 1);
    this.screenService.setCurrentStep(this.activeRouteData?.data?.step || 1);
  }
}
