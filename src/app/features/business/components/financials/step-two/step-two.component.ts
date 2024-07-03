import {Component, inject} from '@angular/core';
import {QuestionsService} from "../../../../questions/services/questions/questions.service";
import {combineLatest, Observable, tap} from "rxjs";
import {Question, QuestionType} from "../../../../questions/interfaces";
import {CommonModule} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {BusinessPageService} from "../../../services/business-page/business.page.service";
import {SubmissionService, SubMissionStateService, UserSubmissionResponse} from "../../../../../shared";
import {RouterLink} from "@angular/router";
import {BUSINESS_FINANCIALS_SUBSECTION_IDS} from "../../../../../shared/business/services/onboarding.questions.service";

@Component({
  selector: 'app-step-two',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './step-two.component.html',
  styleUrl: './step-two.component.scss'
})
export class StepTwoComponent {

  questions: Question[] = [];
  field_type = QuestionType;
  private _formBuilder =inject(FormBuilder)
  private _questionService = inject(QuestionsService);
  private _pageService = inject(BusinessPageService);
  private _submissionService = inject(SubmissionService);
  formGroup: FormGroup =this._formBuilder.group({})
  private _submissionStateService = inject(SubMissionStateService)
  // subsections$ = this._questionService.getSubSectionsOfaSection(5).pipe(tap(res => {
  //   debugger
  // }))

  submission$ =new Observable<unknown>()
  questions$ =  this._questionService.getQuestionsOfSubSection(BUSINESS_FINANCIALS_SUBSECTION_IDS.STEP_TWO).pipe(tap(questions => {
    this.questions = questions
    this._createFormControls();
  }))

  private _hasMatchingQuestionId(questions: Question[], responses: UserSubmissionResponse[]): boolean {
    // Create a set of question ids from the responses array
    const responseQuestionIds = new Set(responses.map(response => response.question.id));

    // Check if any question in the questions array has an id in the responseQuestionIds set
    return questions.some(question => responseQuestionIds.has(question.id));
  }

  currentEntries$ = this._submissionStateService.currentUserSubmission$;
  // init$ = combineLatest([this.questions$, this.currentEntries$]).pipe(tap(res => {
  //   if(this._hasMatchingQuestionId(res[0], res[1])) { //Checks whether
  //     this.setNextStep();
  //   }
  // }))

  private _createFormControls() {
    this.questions.forEach(question => {
      this.formGroup.addControl('question_' + question.id, this._formBuilder.control('', Validators.required));
    });
  }
  setNextStep(){
    this._pageService.setCurrentStep(3)
  }
  goBack(){
    this._pageService.setCurrentStep(1);
  }

  handleSubmit(){
    const formValues =this.formGroup.value;
    const submissionData = this.questions.map(question => {
      const questionId =question.id;
      const openQuestion = question.answers.find(a => a.text === 'OPEN');
      const answerId =openQuestion ? openQuestion.id : formValues['question_' + question.id]

      return {questionId, answerId:parseInt(answerId), text: formValues['question_' + question.id]}
    });

    this.submission$ = this._submissionService.createMultipleSubmissions(submissionData).pipe(tap(res => {
      this.setNextStep();
    }))
  }
}
