import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { combineLatest, switchMap, tap } from 'rxjs';
import { SharedModule } from '../../../../shared';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { QUESTION_FORM_STEPS } from "../../../../shared/interfaces/question.form.steps.enum";
import { UiComponent } from "../../components/ui/ui.component";
import { QuestionsService } from '../../services/questions/questions.service';
import { QuestionCardComponent } from '../../../questions/components/question-card/question-card.component';

@Component({
  selector: 'app-subsection',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
    UiComponent,
    QuestionCardComponent,
    RouterLink
  ],
  templateUrl: './subsector.component.html',
  styleUrl: './subsector.component.scss'
})
export class SubSectorComponent {
  section!: any;
  questions: any[] = [];
  subSectionId!: number;
  subsectionName!: string;
  routeId!: string;

  protected readonly STEPS = QUESTION_FORM_STEPS;
  private _activatedRoute = inject(ActivatedRoute);
  private _questionsService = inject(QuestionsService);

  sectionId!: number;

  init$ =this.fetchQuestions();
    fetchQuestions(){
      return this._activatedRoute.params.pipe(switchMap((res) => {
        // @ts-ignore
        this.routeId = res['id'].trim();
        const ids = this.routeId.split('-');
        this.sectionId = Number(ids.at(0))
        this.subSectionId = Number(ids.at(1));

        const sectionInfo$ = this._questionsService.getSingleSubsection(this.subSectionId);
        const questionsFetch$ = this._questionsService.getQuestionsOfSubSection(this.subSectionId)

        return combineLatest([sectionInfo$, questionsFetch$])

      }), tap(([subsectionInfo, questions]) => {
        this.subsectionName = subsectionInfo.name;
        this.questions = questions
      }))
    }

  reloadUI(){
      this.init$ =this.fetchQuestions();
  }
}
