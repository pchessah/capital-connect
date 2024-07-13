import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { RouterLink } from "@angular/router";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../../../../shared";
import { Observable, of, switchMap, tap } from "rxjs";
import { SectorsService } from "../../services/sectors/sectors.service";
import { ConfirmationService, FeedbackService } from "../../../../core";

@Component({
  selector: 'app-sector-card',
  standalone: true,
  imports: [SharedModule, CommonModule, RouterLink],
  templateUrl: './sector-card.component.html',
  styleUrl: './sector-card.component.scss'
})
export class SectorCard {
  private _sectorService = inject(SectorsService);
  private _confirmationService = inject(ConfirmationService);
  private _feedBackService = inject(FeedbackService);

  @Input() name!: string;
  @Input() id!: number;
  @Output() refreshSectorEvent = new EventEmitter();

  delete$ = new Observable();
  deleteSector(sectorId: number) {
    this.delete$ = this._confirmationService.confirm('Are you sure to delete this sector?').pipe(switchMap(confirmation => {
      if (confirmation) {
        return this._sectorService.removeSector(sectorId);
      }
      return of(null);
    }), tap(confirmation => {
      if (confirmation) {
        this._feedBackService.success('Sector removed successfully!');
        this.refreshSectorEvent.emit(true);
      }
    }))

  }
}
