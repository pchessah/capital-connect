import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {SharedModule} from "../../../../../shared/shared.module";
import {CardComponent} from "../card/card.component";

@Component({
  selector: 'app-overview-section',
  standalone: true,
  imports: [CommonModule, SharedModule, CardComponent],
  templateUrl: './overview-section.component.html',
  styleUrl: './overview-section.component.scss'
})
export class OverviewSectionComponent {

}
