import {Component, inject} from '@angular/core';
import {QuestionsService} from "../../../../questions/services/questions/questions.service";
import {tap} from "rxjs";
import {Question} from "../../../../questions/interfaces";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-step-two',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './step-two.component.html',
  styleUrl: './step-two.component.scss'
})
export class StepTwoComponent {

  private _questionService = inject(QuestionsService);
  // subsections$ = this._questionService.getSubSectionsOfaSection(5).pipe(tap(res => {
  //   debugger
  // }))

  questions$ =  this._questionService.getQuestionsOfSubSection(13).pipe(tap(questions => {
    this.questions = questions
    // debugger
  }))
  questions: Question[] = [];
}
