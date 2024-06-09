import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {SharedModule} from "../../../../../shared/shared.module";

@Component({
  selector: 'app-overview-section',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './overview-section.component.html',
  styleUrl: './overview-section.component.scss'
})
export class OverviewSectionComponent {
  overview =[
    {title: 'Investor Preparedness', value: '30 %', featured: true, action: 'See suggested actions'},
    {title: 'Profile Views', value: '30', featured: false, action: 'See suggested actions'},
    {title: 'Matched Advisors', value: '4', period: '+2 Past month', featured: false, action: 'See suggested actions'},
    {title: 'Matched Investors', value: '4', period: '+2 Past month', featured: false, action: 'See suggested actions'},
  ]
}
