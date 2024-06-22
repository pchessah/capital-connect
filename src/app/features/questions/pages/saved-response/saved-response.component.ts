import { Component, inject, signal } from '@angular/core';
import { SharedModule } from "../../../../shared";
import { UiComponent } from "../../components/ui/ui.component";
import { Question, SubSection } from '../../interfaces';
import { Router } from '@angular/router';
import { QuestionsService } from '../../services/questions/questions.service';
import { Observable, tap } from 'rxjs';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-saved-response',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    UiComponent
  ],
  templateUrl: './saved-response.component.html',
  styleUrl: './saved-response.component.scss'
})
export class SavedResponseComponent {

  private _questionService = inject(QuestionsService);
  private _router = inject(Router);

  readonly panelOpenState = signal(false);

  sections$ = this._questionService.getAllSections()
  subsections$ = new Observable<SubSection[]>();
  questions$ =  new Observable<Question[]>();
  subsections: SubSection[] = [];
  questions: Question[] = [];

  fetchSubSections(sectionId:number){
    this.subsections$ = this._questionService.getSubSectionsOfaSection(sectionId).pipe(tap(subsections => this.subsections = subsections))
  }

  fetchQuestions(subsectionId:number){
    this.questions$ = this._questionService.getQuestionsOfSubSection(subsectionId).pipe(tap(questions => this.questions = questions))
  }

  createSection () {
    this._router.navigateByUrl('/questions/section')
  }
  editSection(sectionId:number){
    this._router.navigateByUrl(`/questions/section/${sectionId}`)
  }

  createSubSection(sectionId:number){
    this._router.navigate(['/questions/sub-section'], { state: { sectionId: sectionId } })
  }

  editSubSection(subsectionId:number, sectionId:number){
    this._router.navigate(['/questions/sub-section'], { state: { sectionId: sectionId, subsectionId: subsectionId } })
  }

  createQuestion(subsectionId:number){
    this._router.navigate(['/questions/single-question'], { state: { subsectionId: subsectionId } })
  }

  createAnswer(questionId: number){
    this._router.navigate(['/questions/answers'], { state: { questionId: questionId } })

  }
}
