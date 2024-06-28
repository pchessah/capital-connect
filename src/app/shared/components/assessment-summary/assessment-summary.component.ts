import {Component, Input} from '@angular/core';
import {SharedModule} from "../../index";

@Component({
  selector: 'app-assessment-summary',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './assessment-summary.component.html',
  styleUrl: './assessment-summary.component.scss'
})
export class AssessmentSummaryComponent {
  @Input() title!:string;
  @Input() body!:string;
  @Input() linkLabel!:string;
}
