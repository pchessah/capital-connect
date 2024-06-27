import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {Answer} from "../../interfaces";
import {CommonModule} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {RouterLink} from "@angular/router";
import {QuestionsService} from "../../services/questions/questions.service";
import {ConfirmationService, FeedbackService} from "../../../../core";
import {Observable, of, switchMap, tap} from "rxjs";

@Component({
  selector: 'app-question-card',
  standalone: true,
  imports: [CommonModule, MatIcon, RouterLink],
  templateUrl: './question-card.component.html',
  styleUrl: './question-card.component.scss'
})
export class QuestionCardComponent {
  @Input() text!: string;
  @Input() id!: number;
  @Input() subSectionId!: number;
  @Input() type!: string;
  @Input() sectionId!: number;
  @Input() answers: Answer[] =[]

  @Output()  refreshUIEvent = new EventEmitter();
  @Output()  refreshAnswersEvent = new EventEmitter();

  private _questionService = inject(QuestionsService);

  private _confirmationService = inject(ConfirmationService);
  delete$ = new Observable();
  private _feedBackService = inject(FeedbackService);
  deleteQuestion(questionId: number) {
    this.delete$ =this._confirmationService.confirm('Are you sure to delete this question?').pipe(switchMap(confirmation => {
      if (confirmation) {
        return this._questionService.removeQuestion(questionId);
      }
      return of(null);
    }), tap(confirmation => {
      if (confirmation) {
        this._feedBackService.success('Subsection was removed successfully!');
        this.refreshUIEvent.emit(true);
      }
    }))

  }

  deleteAnswer(answerId: number) {
    this.delete$ =this._confirmationService.confirm('Are you sure to delete this answer?').pipe(switchMap(confirmation => {
      if (confirmation) {
        return this._questionService.removeAnswer(answerId);
      }
      return of(null);
    }), tap(confirmation => {
      if (confirmation) {
        this._feedBackService.success('Answer was removed successfully!');
        this.refreshUIEvent.emit(true);
      }
    }))

  }
}
