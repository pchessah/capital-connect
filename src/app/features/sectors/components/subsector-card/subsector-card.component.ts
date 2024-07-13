import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Observable, of, switchMap, tap } from "rxjs";
import { SectorsService } from "../../services/sectors/sectors.service";
import { RouterLink } from "@angular/router";
import { MatIcon } from "@angular/material/icon";
import { CommonModule } from "@angular/common";
import { ConfirmationService, FeedbackService } from "../../../../core";

@Component({
  selector: 'app-subsector-card',
  standalone: true,
  imports: [
    MatIcon,
    RouterLink,
    CommonModule
  ],
  templateUrl: './subsector-card.component.html',
  styleUrl: './subsector-card.component.scss'
})
export class SubsectorCardComponent {
  @Input() id!: number;
  @Input() name!: string;
  @Input() sectorId!: number;
  @Output() refreshSubSectorEvent = new EventEmitter();

  private _sectorService = inject(SectorsService);
  private _confirmationService = inject(ConfirmationService);
  private _feedBackService = inject(FeedbackService);

  delete$ = new Observable();

  deleteSubsector(sectorId: number) {
    this.delete$ = this._confirmationService.confirm('Are you sure to delete this sub-sector?').pipe(switchMap(confirmation => {
      if (confirmation) {
        return this._sectorService.removeSubSector(sectorId);
      }
      return of(null);
    }), tap(confirmation => {
      if (confirmation) {
        this._feedBackService.success('Subsection was removed successfully!');
        this.refreshSubSectorEvent.emit(true);
      }
    }))

  }
}
