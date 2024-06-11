import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {SharedModule} from "../../../../../shared/shared.module";
import {STEP_STATUS, STEP_TYPE} from "../../../interfaces/status.enum";



@Component({
  selector: 'app-profile-status',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './profile-status.component.html',
  styleUrl: './profile-status.component.scss'
})
export class ProfileStatusComponent {
  currentStep:number = 2;
  STATUS = STEP_STATUS;
  steps: STEP_TYPE[] =[
    {title: 'Business Financials', status: STEP_STATUS.COMPLETE},
    {title: 'Investor Eligibility', status: STEP_STATUS.INCOMPLETE},
    {title: 'Investor Preparedness', status: STEP_STATUS.INCOMPLETE},
  ]
}
