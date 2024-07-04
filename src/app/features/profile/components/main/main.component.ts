import { Component, inject } from '@angular/core';

import { MatIcon } from "@angular/material/icon";
import { NavbarComponent } from "../../../../core";
import { OverviewComponent } from "../../../business/components/dashboard/overview/overview.component";
import { SchedulesSectionComponent } from "../../../../shared/components/schedules-section/schedules-section.component";
import { catchError, EMPTY, Observable, of, switchMap, tap } from "rxjs";
import { USER_ROLES } from "../../../../shared";
import { Router } from "@angular/router";
import { AuthService } from "../../../auth/services/auth.service";
import { DynamicRoutingService } from "../../../../shared/services/dynamic.routing.service";
import { OrganizationOnboardService } from "../../../organization/services/organization-onboard.service";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    MatIcon,
    NavbarComponent,
    OverviewComponent,
    SchedulesSectionComponent,
    CommonModule
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  private _router = inject(Router);
  private _authService = inject(AuthService);
  private _dynamicRoutingService = inject(DynamicRoutingService);
  private _organizationService = inject(OrganizationOnboardService)

  userProfile$ = new Observable()



}
