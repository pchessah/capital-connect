import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {SharedModule} from "../../../../../shared/shared.module";

type SCHEDULE_TYPE ={
  activity: string,
  datetime: string,
}

@Component({
  selector: 'app-schedules-section',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './schedules-section.component.html',
  styleUrl: './schedules-section.component.scss'
})



export class SchedulesSectionComponent {
  pinned_schedules: SCHEDULE_TYPE[] =[
    {activity: 'Review with advisor', datetime: 'Today, 08:15 AM'}
  ]

  other_schedules: SCHEDULE_TYPE[] =[
    {activity: 'Meeting with capital connect', datetime: 'Today, 09:15 AM'}
  ]
}
