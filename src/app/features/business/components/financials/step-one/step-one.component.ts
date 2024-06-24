import { Component, inject } from '@angular/core';
import { QuestionsService } from '../../../../questions/services/questions/questions.service';
import { tap } from 'rxjs';
import { Question } from '../../../../questions/interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-step-one',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './step-one.component.html',
  styleUrl: './step-one.component.scss'
})
export class StepOneComponent {
  private _questionService = inject(QuestionsService);

  // subsections$ = this._questionService.getSubSectionsOfaSection(5).pipe(tap(res => {
  //   debugger
  // }))

  questions$ =  this._questionService.getQuestionsOfSubSection(12).pipe(tap(questions => {
    this.questions = questions
  }))
  questions: Question[] = [];

}
