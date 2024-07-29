import { Component, inject } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { Observable, tap } from "rxjs";
import { DropdownModule } from "primeng/dropdown";
import { MultiSelectModule } from "primeng/multiselect";
import { AuthModule } from "../../../../auth/modules/auth.module";
import { Question, QuestionType } from "../../../../questions/interfaces";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { QuestionsService } from "../../../../questions/services/questions/questions.service";
import { BusinessPageService } from "../../../services/business-page/business.page.service";
import { Submission, SubmissionService, SubMissionStateService } from "../../../../../shared";
import { getInvestorEligibilitySubsectionIds, loadInvestorEligibilityQuestions } from "../../../../../shared/business/services/onboarding.questions.service";
import { CompanyStateService } from '../../../../organization/services/company-state.service';

@Component({
  selector: 'app-step-one',
  standalone: true,
  imports: [
    AuthModule,
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    DropdownModule,
    MultiSelectModule
  ],
  templateUrl: './step-one.component.html',
  styleUrl: './step-one.component.scss'
})
export class StepOneComponent {
  private _formBuilder = inject(FormBuilder)
  private _questionService = inject(QuestionsService);
  private _pageService = inject(BusinessPageService);
  private _submissionService = inject(SubmissionService);
  private _submissionStateService = inject(SubMissionStateService);
  private _companyStateService = inject(CompanyStateService);

  formGroup: FormGroup = this._formBuilder.group({})
  fieldType = QuestionType;
  questions: Question[] = [];

  private _companyGrowthStage = this._companyStateService.currentCompany.growthStage;
  private _investorEligibilitySubsectionId = getInvestorEligibilitySubsectionIds(this._companyGrowthStage);

  private _idToLoad = (this._investorEligibilitySubsectionId).STEP_ONE

  submission$ = new Observable<unknown>();

  questions$ = this._questionService.getQuestionsOfSubSection(this._idToLoad).pipe(tap(questions => {
    this.questions = questions
    this._createFormControls();
  }))

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
  setNextStep() {
    this._pageService.setCurrentStep(2)
  }
  goBack() {
    this._pageService.setCurrentPage(1);
  }

  handleSubmit() {
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
      } else if (question.type == this.fieldType.SHORT_ANSWER) {
        const openQuestion = question.answers.find(a => a.text === 'OPEN');
        const answerId = openQuestion ? openQuestion.id : formValues['question_' + question.id]

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
    this.submission$ = this._submissionService.createMultipleSubmissions(submissionData).pipe(tap(() => {
      this.setNextStep();
    }));
  }
}
