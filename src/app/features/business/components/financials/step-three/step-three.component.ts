import {Component, inject} from '@angular/core';
import {QuestionsService} from "../../../../questions/services/questions/questions.service";
import {tap} from "rxjs";
import {Question} from "../../../../questions/interfaces";
import {AsyncPipe, NgIf} from "@angular/common";

@Component({
  selector: 'app-step-three',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf
  ],
  templateUrl: './step-three.component.html',
  styleUrl: './step-three.component.scss'
})
export class StepThreeComponent {
  private _questionService = inject(QuestionsService);
  // subsections$ = this._questionService.getSubSectionsOfaSection(5).pipe(tap(res => {
  //   debugger
  // }))

  questions$ =  this._questionService.getQuestionsOfSubSection(14).pipe(tap(questions => {
    this.questions = questions
  }))
  questions: Question[] = [];
}
