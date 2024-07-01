import { Component } from '@angular/core';
import {
    AdvertisementSpaceComponent
} from "../../../../../shared/components/advertisement-space/advertisement-space.component";
import {
    AssessmentSummaryComponent
} from "../../../../../shared/components/assessment-summary/assessment-summary.component";
import {MatIcon} from "@angular/material/icon";
import {NavbarComponent} from "../../../../../core";
import {OverviewComponent} from "../../dashboard/overview/overview.component";
import {
    SchedulesSectionComponent
} from "../../../../../shared/components/schedules-section/schedules-section.component";
import {TaskActionComponent} from "../../../../../shared/components/task-action/task-action.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    AdvertisementSpaceComponent,
    AssessmentSummaryComponent,
    MatIcon,
    NavbarComponent,
    OverviewComponent,
    SchedulesSectionComponent,
    TaskActionComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

  task_one =[
    {name: 'Upload', action: ''},
    {name: 'Validate', action: ''},
    {name: 'Download', action: ''}
  ]
  task_two =[
    {name: 'Upload file', action: ''},
    {name: 'Validate', action: ''},
    {name: 'Download', action: ''}
  ]
  task_three =[
    {name: 'Upload file', action: ''},
    {name: 'Validate', action: ''},
    {name: 'Download', action: ''},
    {name: 'Get help', action: ''}
  ]
  task_four =[
    {name: 'Upload file', action: ''},
    {name: 'Validate', action: ''},
    {name: 'Download', action: ''},
    {name: 'Get help', action: ''}
  ]
}
