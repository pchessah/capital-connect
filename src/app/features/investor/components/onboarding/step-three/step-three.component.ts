import {Component, inject} from '@angular/core';
import {Question, QuestionType} from "../../../../questions/interfaces";
import {Router, RouterLink} from "@angular/router";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {QuestionsService} from "../../../../questions/services/questions/questions.service";
import {SubmissionService, SubMissionStateService, UserSubmissionResponse} from "../../../../../shared";
import {combineLatest, Observable, tap} from "rxjs";
import {INVESTOR_ONBOARDING_SUBSECTION_IDS} from "../../../../../shared/business/services/onboarding.questions.service";
import {CommonModule} from "@angular/common";
import {InvestorScreensService} from "../../../services/investor.screens.service";

@Component({
  selector: 'app-step-three',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule,],
  templateUrl: './step-three.component.html',
  styleUrl: './step-three.component.scss'
})
export class StepThreeComponent {
  questions: Question[] = [];
  field_type = QuestionType;

  private _router = inject(Router)
  private _formBuilder =inject(FormBuilder)
  private _questionService = inject(QuestionsService);
  private _pageService = inject(InvestorScreensService);
  private _submissionService = inject(SubmissionService);
  formGroup: FormGroup =this._formBuilder.group({})
  private _submissionStateService = inject(SubMissionStateService)

  submission$ =new Observable<unknown>()
  questions$ =  this._questionService.getQuestionsOfSubSection(INVESTOR_ONBOARDING_SUBSECTION_IDS.STEP_THREE).pipe(tap(questions => {
    this.questions = questions
    this._createFormControls();
  }))

  private _hasMatchingQuestionId(questions: Question[], responses: UserSubmissionResponse[]): boolean {
    const responseQuestionIds = new Set(responses.map(response => response.question.id));
    return questions.some(question => responseQuestionIds.has(question.id));
  }

  currentEntries$ = this._submissionStateService.currentUserSubmission$;
  init$ = combineLatest([this.questions$, this.currentEntries$]).pipe(tap(res => {
    if(this._hasMatchingQuestionId(res[0], res[1])) { //Checks whether
      this.setNextStep();
    }
  }))

  private _createFormControls() {
    this.questions.forEach(question => {
      this.formGroup.addControl('question_' + question.id, this._formBuilder.control('', Validators.required));
    });
  }
  setNextStep(){
    this._pageService.setCurrentScreen(3);
  }
  goBack(){
    this._pageService.setCurrentStep(2);
  }

  handleSubmit(){
    const formValues =this.formGroup.value;
    const submissionData = this.questions.filter(question =>question.type !==this.field_type.MULTIPLE_CHOICE).map(question => {
      const questionId = question.id;
      const openQuestion = question.answers.find(a => a.text === 'OPEN');
      const answerId = openQuestion ? Number(openQuestion.id) : Number(formValues['question_' + question.id])
      return { questionId, answerId, text: formValues['question_' + question.id].toString()}
    });

    this.submission$ = this._submissionService.createMultipleSubmissions(submissionData).pipe(tap(res => {
      this.setNextStep();
    }))
  }
}
