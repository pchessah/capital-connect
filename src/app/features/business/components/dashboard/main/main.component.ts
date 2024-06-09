import { Component } from '@angular/core';
import {NavbarComponent} from "../../../../../core/components/navbar/navbar.component";
import {ProfileStatusComponent} from "../profile-status/profile-status.component";
import {NotificationsComponent} from "../notifications/notifications.component";
import {AssessmentSummaryComponent} from "../assessment-summary/assessment-summary.component";
import {AdvertisementSpaceComponent} from "../advertisement-space/advertisement-space.component";
import {OverviewSectionComponent} from "../overview-section/overview-section.component";
import {SchedulesSectionComponent} from "../schedules-section/schedules-section.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    NavbarComponent, ProfileStatusComponent, NotificationsComponent,
    AssessmentSummaryComponent, AdvertisementSpaceComponent, OverviewSectionComponent,
    SchedulesSectionComponent,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
