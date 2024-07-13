import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared';
import { UiComponent } from "../../components/ui/ui.component";
import { SectorComponent } from "../sector/sector.component";

@Component({
  selector: 'app-questions-dashboard',
  standalone: true,
  templateUrl: './sector-dashboard.component.html',
  styleUrl: './sector-dashboard.component.scss',
  imports: [SharedModule, CommonModule, UiComponent, SectorComponent]
})
export class SectorsDashboardComponent {


}

