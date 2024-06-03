import { Component } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.scss'
})


export class ProgressBarComponent {
  steps =[
    {name: 'Business Financials', status: 'complete'},
    {name: 'Investor Eligibility', status: 'complete'},
    {name: 'Investor Preparedness', status: 'incomplete'},
  ];
  current_step =0;
}
