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
    OverviewComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
