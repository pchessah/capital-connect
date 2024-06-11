import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {SharedModule} from "../../../../../shared/shared.module";
import {STEP_STATUS} from "../../../interfaces/profile.status.enum";



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
  steps =[
    {title: 'Business Financials', status: 'complete'},
    {title: 'Investor Eligibility', status: 'incomplete'},
    {title: 'Investor Preparedness', status: 'incomplete'},
  ]
}
