import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {Observable, of, switchMap, tap} from "rxjs";
import {QuestionsService} from "../../services/questions/questions.service";
import { RouterLink} from "@angular/router";
import {MatIcon} from "@angular/material/icon";
import { CommonModule} from "@angular/common";
import {ConfirmationService, FeedbackService} from "../../../../core";

@Component({
  selector: 'app-subsection-card',
  standalone: true,
  imports: [
    MatIcon,
    RouterLink,
    CommonModule
  ],
  templateUrl: './subsection-card.component.html',
  styleUrl: './subsection-card.component.scss'
})
export class SubsectionCardComponent {
  @Input() id!:number;
  @Input() name!:string;
  @Input() sectionId!:number;
  @Output()  refreshSubsectionsEvent = new EventEmitter();

  private _questionService = inject(QuestionsService);

  private _confirmationService = inject(ConfirmationService);
  delete$ = new Observable();
  private _feedBackService = inject(FeedbackService);
  deleteSubsection(sectionId: number) {
    this.delete$ =this._confirmationService.confirm('Are you sure to delete this sub-section?').pipe(switchMap(confirmation => {
      if (confirmation) {
        return this._questionService.removeSubSection(sectionId);
      }
      return of(null);
    }), tap(confirmation => {
      if (confirmation) {
        this._feedBackService.success('Subsection was removed successfully!');
        this.refreshSubsectionsEvent.emit(true);
      }
    }))

  }
}
