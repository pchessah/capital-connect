import { Component } from '@angular/core';
import {SharedModule} from "../../../../../shared";

@Component({
  selector: 'app-assessment-summary',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './assessment-summary.component.html',
  styleUrl: './assessment-summary.component.scss'
})
export class AssessmentSummaryComponent {

}
