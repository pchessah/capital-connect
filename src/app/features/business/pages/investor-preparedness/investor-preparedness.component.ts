import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessPageService } from '../../services/business-page/business.page.service';
import { LayoutComponent } from '../../../../shared/business/layout/layout.component';
import { IndexLayoutComponent } from '../../../../shared/business/components/index-layout/index-layout.component';
import { FormsLayoutComponent } from '../../../../shared/business/components/forms-layout/forms-layout.component';
import { IndexComponent } from '../../components/investor-preparedness/index/index.component';
import { StepsComponent } from '../../components/investor-preparedness/steps/steps.component';
import { SuccessScreenComponent } from '../../components/investor-preparedness/success-screen/success-screen.component';
import {SubMissionStateService} from "../../../../shared";

@Component({
  selector: 'app-investor-preparedness',
  standalone: true,
  imports: [CommonModule, LayoutComponent, IndexLayoutComponent, FormsLayoutComponent, IndexComponent, StepsComponent,SuccessScreenComponent],
  templateUrl: './investor-preparedness.component.html',
  styleUrl: './investor-preparedness.component.scss'
})
export class InvestorPreparednessComponent {

  constructor(private screenService: BusinessPageService) {}
  currentPage$ = this.screenService.current_page$
  private _submissionStateService = inject(SubMissionStateService)
  // @ts-ignore
  private screenService= inject(BusinessPageService)

  usersSubmission$ = this._submissionStateService.getUserSubmissions();
}
