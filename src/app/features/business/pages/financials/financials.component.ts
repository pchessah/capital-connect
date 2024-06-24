import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessPageService } from '../../services/business-page/business.page.service';
import { IndexComponent } from '../../components/financials/index/index.component';
import { StepsComponent } from '../../components/financials/steps/steps.component';
import { LayoutComponent } from '../../../../shared/business/layout/layout.component';
import { IndexLayoutComponent } from '../../../../shared/business/components/index-layout/index-layout.component';
import { FormsLayoutComponent } from '../../../../shared/business/components/forms-layout/forms-layout.component';
import { SuccessScreenComponent } from '../../components/financials/success-screen/success-screen.component';
import { SubMissionStateService } from '../../../../shared';

@Component({
  standalone: true,
  selector: 'app-financials',
  styleUrl: './financials.component.scss',
  templateUrl: './financials.component.html',
  imports: [CommonModule, LayoutComponent, IndexLayoutComponent, FormsLayoutComponent, IndexComponent, StepsComponent, SuccessScreenComponent],
})

export class FinancialsComponent {

  private _submissionStateService = inject(SubMissionStateService)
  private screenService= inject(BusinessPageService)

  currentPage$ = this.screenService.current_page$;

  usersSubmission$ = this._submissionStateService.getUserSubmissions();
  
}
