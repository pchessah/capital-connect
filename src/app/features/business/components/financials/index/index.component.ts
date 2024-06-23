import { Component, inject } from '@angular/core';
import { BusinessPageService } from '../../../services/business-page/business.page.service';
import { CommonModule } from '@angular/common';
import { QuestionsService } from '../../../../questions/services/questions/questions.service';
import { tap } from 'rxjs';
import { Question } from '../../../../questions/interfaces';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss',
})
export class IndexComponent {
  private _pageService: BusinessPageService = inject(BusinessPageService);

  private _questionService = inject(QuestionsService);

  // subsections$ = this._questionService.getSubSectionsOfaSection(5).pipe(tap(res => {
  //   debugger
  // }))

  questions$ =  this._questionService.getQuestionsOfSubSection(11).pipe(tap(questions => {
    this.questions = questions
  }))
  questions: Question[] = [];


  setNextScreen() {
    this._pageService.setCurrentPage(2);
  }

}
