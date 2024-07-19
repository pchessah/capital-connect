import { Component } from '@angular/core';
import {
  AdvertisementSpaceComponent
} from "../../../../../shared/components/advertisement-space/advertisement-space.component";
import {
  AssessmentSummaryComponent
} from "../../../../../shared/components/assessment-summary/assessment-summary.component";
import {MatIcon} from "@angular/material/icon";
import {NavbarComponent} from "../../../../../core";
import {
  OverviewSectionComponent
} from "../../../../../shared/components/overview-section/overview-section.component";
import {
  SchedulesSectionComponent
} from "../../../../../shared/components/schedules-section/schedules-section.component";
import {OverviewComponent} from "../overview/overview.component";
import { CardComponent } from '../../../../../shared/components/card/card.component';
import { MatchedBusiness } from '../../../../../shared/interfaces';
import { inject } from '@angular/core';
import { BusinessAndInvestorMatchingService } from '../../../../../shared/business/services/busines.and.investor.matching.service';
import { AuthStateService } from '../../../../auth/services/auth-state.service';
import { tap } from 'rxjs';


@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    AdvertisementSpaceComponent,
    AssessmentSummaryComponent,
    MatIcon,
    NavbarComponent,
    OverviewSectionComponent,
    SchedulesSectionComponent,
    OverviewComponent,
    CardComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  private _authService = inject(AuthStateService)
  private _businessMatchingService = inject(BusinessAndInvestorMatchingService)
  visible = false;
  matchedBusinesses: MatchedBusiness[] = []

  stats$ = this._businessMatchingService.getMatchedBusinesses(this._authService.currentUserId()  && this._authService.currentUserId() > 0 ? this._authService.currentUserId()  : Number(sessionStorage.getItem('userId'))).pipe(tap((res: MatchedBusiness[]) => {
    this.matchedBusinesses = res
  }))

  showDialog() {
    this.visible = true;
  }


}
