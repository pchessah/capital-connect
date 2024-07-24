import { Component, inject } from '@angular/core';
import { SidenavComponent } from '../../../../core';

import { MatIcon } from "@angular/material/icon";
import { NavbarComponent } from "../../../../core";
import { OverviewComponent } from "../../../business/components/dashboard/overview/overview.component";
import { SchedulesSectionComponent } from "../../../../shared/components/schedules-section/schedules-section.component";

import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    MatIcon,
    NavbarComponent,
    OverviewComponent,
    SchedulesSectionComponent,
    CommonModule,
    SidenavComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  links =[
    {label: 'Dashboard', href: '/business', exact: true, icon: 'grid_view'},
    {label: 'My business', href: '/business/my-business', exact: false, icon: 'business_center'},
    {label: 'My Bookings', href: '/business/my-bookings', exact: false, icon: 'event'}

  ]
}
