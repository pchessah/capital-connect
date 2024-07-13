import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { SharedModule } from "../../../../shared";
import { CommonModule } from "@angular/common";
import { Observable, of, switchMap, tap } from "rxjs";
import { QuestionsService } from "../../services/questions/questions.service";
import { RouterLink } from "@angular/router";
import { ConfirmationService, FeedbackService } from "../../../../core";

@Component({
  selector: 'app-sector-card',
  standalone: true,
  imports: [SharedModule, CommonModule, RouterLink],
  templateUrl: './sector-card.component.html',
  styleUrl: './sector-card.component.scss'
})
export class SectorCard {
  @Input() name!: string;
  @Input() id!: number;
  @Output() refreshSectionsEvent = new EventEmitter();
  private _questionService = inject(QuestionsService);
  private _confirmationService = inject(ConfirmationService);
  delete$ = new Observable();
  private _feedBackService = inject(FeedbackService);
  deleteSection(sectionId: number) {
    this.delete$ = this._confirmationService.confirm('Are you sure to delete this section?').pipe(switchMap(confirmation => {
      if (confirmation) {
        return this._questionService.removeSection(sectionId);
      }
      return of(null);
    }), tap(confirmation => {
      if (confirmation) {
        this._feedBackService.success('Section removed successfully!');
        this.refreshSectionsEvent.emit(true);
      }
    }))

  }
}
