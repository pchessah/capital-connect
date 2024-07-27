import { Component, inject } from '@angular/core';
import { SharedModule } from "../../../../shared";
import { UiComponent } from "../../components/ui/ui.component";
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";
import { SectorCard } from '../../components/sector-card/sector-card.component';
import { SectorsService } from '../../services/sectors/sectors.service';
import { AdminUiContainerComponent } from "../../../admin/components/admin-ui-container/admin-ui-container.component";


@Component({
  selector: 'app-saved-response',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    UiComponent,
    ReactiveFormsModule,
    SectorCard,
    RouterLink,
    AdminUiContainerComponent
],
  templateUrl: './saved-response.component.html',
  styleUrl: './saved-response.component.scss'
})
export class SavedResponseComponent {

  private _sectorService = inject(SectorsService);

  sectors$ = this._sectorService.getAllSectors()

  reFetchSections() {
    this.sectors$ = this._sectorService.getAllSectors();
  }
}
