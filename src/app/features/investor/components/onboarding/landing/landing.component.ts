import {Component, inject} from '@angular/core';
import {QuestionsService} from "../../../../questions/services/questions/questions.service";
import {SubmissionService, SubMissionStateService, UserSubmissionResponse} from "../../../../../shared";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {INVESTOR_ONBOARDING_SUBSECTION_IDS} from "../../../../../shared/business/services/onboarding.questions.service";
import {tap} from "rxjs/operators";
import {combineLatest, Observable} from "rxjs";
import {Question} from "../../../../questions/interfaces";
import {CommonModule} from "@angular/common";
import {AuthModule} from "../../../../auth/modules/auth.module";
import {InvestorScreensService} from "../../../services/investor.screens.service";
import {InvestorScreen} from "../../../interfaces/investor.sections.enum";

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    AuthModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {
  private _pageService = inject(InvestorScreensService);
  private _questionService = inject(QuestionsService);
  private _submissionService = inject(SubmissionService);
  private _submissionStateService = inject(SubMissionStateService)
  private _formBuilder = inject(FormBuilder);
  private _router =inject(Router);

  formGroup: FormGroup = this._formBuilder.group({});
  questions$ = this._questionService.getQuestionsOfSubSection(INVESTOR_ONBOARDING_SUBSECTION_IDS.LANDING).pipe(
    tap(questions => {
      this.questions = questions;
      this._createFormControls();
    })
  );
  currentEntries$ = this._submissionStateService.currentUserSubmission$;

  init$ = combineLatest([this.questions$, this.currentEntries$]).pipe(tap(res => {
    if(this._hasMatchingQuestionId(res[0], res[1])) {
      this.setNextScreen();
    }
  }))

  submit$ = new Observable<unknown>()

  questions: Question[] = [];

  private _hasMatchingQuestionId(questions: Question[], responses: UserSubmissionResponse[]): boolean {
    const responseQuestionIds = new Set(responses.map(response => response.question.id));
    return questions.some(question => responseQuestionIds.has(question.id));
  }

  private _createFormControls() {
    this.questions.forEach(question => {
      this.formGroup.addControl('question_' + question.id, this._formBuilder.control('', Validators.required));
    });
  }

  onSubmit() {
    if(this.questions.length){
      const formValues = this.formGroup.value;
      const submissionData = this.questions.map(question => ({
        questionId: question.id,
        answerId: formValues['question_' + question.id]
      }));

      this.submit$ = this._submissionService.createMultipleSubmissions(submissionData).pipe(tap(res => {
        this.setNextScreen()
      }))
      return
    }
    this.setNextScreen()

  }

  setNextScreen() {
    this._pageService.setCurrentScreen(2);
  }
}
