import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {SharedModule} from "../../../../../shared/shared.module";
import {Chart, registerables} from "chart.js";

@Component({
  selector: 'app-score-section',
  standalone: true,
  imports: [CommonModule, SharedModule, ],
  templateUrl: './score-section.component.html',
  styleUrl: './score-section.component.scss'
})
export class ScoreSectionComponent {
  processes =[
    {process: 'Business Financials', completed: false},
    {process: 'Investor Eligibility', completed: false},
    {process: 'Investor Preparedness', completed: false},
  ]
  constructor() {
    Chart.register(...registerables)
  }

  ngOnInit(): void {
    this.createChart();
  }
  createChart(): void {
    const ctx = document.getElementById('donutChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [300, 300, 300],
          backgroundColor: ['#064635', '#f0bb62', '#519259'],
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
           display: false
          },
        },
        cutout: '60%',
      },
    });
  }
}
