import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";

enum STEP_STATUS {
  COMPLETE ='complete',
  INCOMPLETE = 'incomplete',
}

@Component({
  selector: 'app-profile-status',
  standalone: true,
  imports: [CommonModule],
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
