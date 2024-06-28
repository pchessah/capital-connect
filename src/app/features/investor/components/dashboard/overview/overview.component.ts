import { Component } from '@angular/core';
import {OverviewSectionComponent} from "../../../../../shared/components/overview-section/overview-section.component";
import {CardComponent} from "../../../../../shared/components/card/card.component";

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [
    OverviewSectionComponent,
    CardComponent
  ],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent {

}
