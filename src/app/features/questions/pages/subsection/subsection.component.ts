import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormStateService } from '../../services/form-state/form-state.service';
import { CommonModule } from '@angular/common';
import { combineLatest, Observable, switchMap, tap } from 'rxjs';
import { SharedModule } from '../../../../shared';
import { Question, Section } from '../../interfaces';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { QUESTION_FORM_STEPS } from "../../../../shared/interfaces/question.form.steps.enum";
import { UiComponent } from "../../components/ui/ui.component";
import { QuestionsService } from '../../services/questions/questions.service';
import { QuestionCardComponent } from "../../components/question-card/question-card.component";

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
  templateUrl: './subsection.component.html',
  styleUrl: './subsection.component.scss'
})
export class SubSectionComponent {
  section!: Section;
  questions: Question[] = [];
  subSectionId!: number;
  subsectionName!: string;
  routeId!: string;

  protected readonly STEPS = QUESTION_FORM_STEPS;
  private _activatedRoute = inject(ActivatedRoute);
  private _questionsService = inject(QuestionsService);

  sectionId!: number;


  sectionInfo$ = new Observable<Section>();
  questionsFetch$ = new Observable<Question[]>();
  init$ = this._activatedRoute.params.pipe(switchMap((res) => {
    // @ts-ignore
    this.routeId = res['id'].trim();
    const ids = this.routeId.split('-');
    this.sectionId = Number(ids.at(0))
    this.subSectionId = Number(ids.at(1));

    this.sectionInfo$ = this._questionsService.getSingleSubsection(this.subSectionId);
    this.questionsFetch$ = this._questionsService.getQuestionsOfSubSection(this.subSectionId)

    return combineLatest([this.sectionInfo$, this.questionsFetch$])

  }), tap(([subsectionInfo, questions]) => {
    this.subsectionName = subsectionInfo.name;
    this.questions = questions
  }))


}
