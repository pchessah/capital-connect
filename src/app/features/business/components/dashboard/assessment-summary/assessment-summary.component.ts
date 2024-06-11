import { Component } from '@angular/core';
import {SharedModule} from "../../../../../shared/shared.module";

@Component({
  selector: 'app-assessment-summary',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './assessment-summary.component.html',
  styleUrl: './assessment-summary.component.scss'
})
export class AssessmentSummaryComponent {

}
