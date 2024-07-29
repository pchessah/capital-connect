import {Component, inject} from '@angular/core';
import {QuestionsService} from "../../../../questions/services/questions/questions.service";
import {combineLatest, Observable, tap} from "rxjs";
import {Question, QuestionType} from "../../../../questions/interfaces";

import {CommonModule } from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Submission, SubmissionService, SubMissionStateService, UserSubmissionResponse} from "../../../../../shared";
import {BusinessPageService} from "../../../services/business-page/business.page.service";
import {Router, RouterLink} from "@angular/router";
import {BUSINESS_FINANCIALS_SUBSECTION_IDS} from "../../../../../shared/business/services/onboarding.questions.service";
import {DropdownModule} from "primeng/dropdown";
import {MultiSelectModule} from "primeng/multiselect";

@Component({
  selector: 'app-step-three',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, DropdownModule, MultiSelectModule],
  templateUrl: './step-three.component.html',
  styleUrl: './step-three.component.scss'
})
export class StepThreeComponent {
  questions: Question[] = [];
  fieldType = QuestionType;

  private _router = inject(Router)
  private _formBuilder =inject(FormBuilder)
  private _questionService = inject(QuestionsService);
  private _pageService = inject(BusinessPageService);
  private _submissionService = inject(SubmissionService);
  formGroup: FormGroup =this._formBuilder.group({})
  private _submissionStateService = inject(SubMissionStateService)

  submission$ =new Observable<unknown>()
  questions$ =  this._questionService.getQuestionsOfSubSection(BUSINESS_FINANCIALS_SUBSECTION_IDS.STEP_THREE).pipe(tap(questions => {
    this.questions = questions
    this._createFormControls();
  }))

  private _hasMatchingQuestionId(questions: Question[], responses: UserSubmissionResponse[]): boolean {

    const responseQuestionIds = new Set(responses.map(response => response.question.id));

    // Check if any question in the questions array has an id in the responseQuestionIds set
    return questions.some(question => responseQuestionIds.has(question.id));
  }

  currentEntries$ = this._submissionStateService.currentUserSubmission$;

  private _createFormControls() {
    this.questions.forEach(question => {
      if (question.type === this.fieldType.MULTIPLE_CHOICE) {
        this.formGroup.addControl('question_' + question.id, this._formBuilder.control([], Validators.required));
      } else {
        this.formGroup.addControl('question_' + question.id, this._formBuilder.control('', Validators.required));
      }
    });
  }
  setNextStep(){
    this._pageService.setCurrentPage(3);
  }
  goBack(){
    this._pageService.setCurrentStep(2);
  }

  handleSubmit(){
    const formValues = this.formGroup.value;
    const submissionData: Submission[] = [];

    this.questions.forEach(question => {
      if (question.type === this.fieldType.MULTIPLE_CHOICE) {
        const selectedAnswers = formValues['question_' + question.id];
        selectedAnswers.forEach((answerId: number) => {
          submissionData.push({
            questionId: question.id,
            answerId: answerId,
            text: ''
          });
        });
      }else if(question.type ==this.fieldType.SHORT_ANSWER){
        const openQuestion = question.answers.find(a => a.text === 'OPEN');
        const answerId =openQuestion ? openQuestion.id : formValues['question_' + question.id]

        submissionData.push({
          questionId: question.id,
          answerId: parseInt(answerId),
          text: formValues['question_' + question.id]
        });
      }
      else {
        submissionData.push({
          questionId: question.id,
          answerId: Number(formValues['question_' + question.id]),
          text: question.type !== this.fieldType.SINGLE_CHOICE && question.type !== this.fieldType.TRUE_FALSE ? formValues['question_' + question.id] : ''
        });
      }
    });
    this.submission$ = this._submissionService.createMultipleSubmissions(submissionData).pipe(tap(res => {
      this.setNextStep();
    }));
  }


}
