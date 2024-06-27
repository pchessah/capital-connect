import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormStateService } from '../../services/form-state/form-state.service';
import { CommonModule } from '@angular/common';
import { Observable, tap } from 'rxjs';
import { SharedModule } from '../../../../shared';
import {Question, Section, SubSection, SubSectionInput} from '../../interfaces';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import { QUESTION_FORM_STEPS } from "../../../../shared/interfaces/question.form.steps.enum";
import { UiComponent } from "../../components/ui/ui.component";
import { QuestionsService } from '../../services/questions/questions.service';
import {QuestionCardComponent} from "../../components/question-card/question-card.component";

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
export class SubSectionComponent{
  section!:Section;
  questions:Question[] =[];
  subSectionId!:number;
  subsectionName!:string;
  routeId!:string;

  protected readonly STEPS = QUESTION_FORM_STEPS;
  private _activatedRoute = inject(ActivatedRoute);
  private _fb = inject(FormBuilder);
  private _formStateService = inject(FormStateService);
  private _router = inject(Router);
  private _questionsService = inject(QuestionsService);

  private _navState: { sectionId: number, subsectionId: number } = this._router.getCurrentNavigation()?.extras.state as any;

  private _subsectionId: number = this._navState?.subsectionId;
  sectionId!: number;


  questions$ = this._activatedRoute.paramMap .pipe(tap((res) =>{
    // @ts-ignore
    this.routeId =res.params.id.trim();
    const ids =this.routeId.split('-');
    this.sectionId =Number(ids.at(0))
    this.subSectionId =Number(ids.at(1));
    this._questionsService.getSingleSubsection(this.subSectionId).pipe(tap(subsection =>{
      this.subsectionName =subsection.name;
    })).subscribe();
    this._questionsService.getQuestionsOfSubSection(this.subSectionId).pipe(tap(vals => {
      this.questions =vals;
    })).subscribe()
  }))


}
