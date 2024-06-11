import { Component, inject } from '@angular/core';

import { ProfileStatusComponent } from "../profile-status/profile-status.component";
import { NotificationsComponent } from "../notifications/notifications.component";
import { AssessmentSummaryComponent } from "../assessment-summary/assessment-summary.component";
import { AdvertisementSpaceComponent } from "../advertisement-space/advertisement-space.component";
import { OverviewSectionComponent } from "../overview-section/overview-section.component";
import { SchedulesSectionComponent } from "../schedules-section/schedules-section.component";
import { ScoreSectionComponent } from "../score-section/score-section.component";

import { NavbarComponent, NavbarToggleService } from '../../../../../core';
import { SharedModule } from '../../../../../shared';


@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    NavbarComponent, ProfileStatusComponent, NotificationsComponent,
    AssessmentSummaryComponent, AdvertisementSpaceComponent, OverviewSectionComponent,
    SchedulesSectionComponent, ScoreSectionComponent, SharedModule,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  private _toggleService = inject(NavbarToggleService)
  toggleVisibility() {
    this._toggleService.toggleVisibility();
  }

}
