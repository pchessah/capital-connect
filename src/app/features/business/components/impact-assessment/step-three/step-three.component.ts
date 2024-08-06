import { Component, inject } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { DropdownModule } from "primeng/dropdown";
import { MultiSelectModule } from "primeng/multiselect";
import { Observable, tap } from "rxjs";
import { Question, QuestionType } from "../../../../questions/interfaces";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { QuestionsService } from "../../../../questions/services/questions/questions.service";
import { BusinessPageService } from "../../../services/business-page/business.page.service";
import { SubmissionService, SubMissionStateService } from "../../../../../shared";
import { AuthModule } from "../../../../auth/modules/auth.module";
import { IMPACT_ASSESMENT_SUBSECTION_IDS } from "../../../../../shared/business/services/onboarding.questions.service";

@Component({
  selector: 'app-step-three',
  standalone: true,
  imports: [CommonModule, AuthModule, ReactiveFormsModule, RouterLink, DropdownModule, MultiSelectModule],
  templateUrl: './step-three.component.html',
  styleUrl: './step-three.component.scss'
})
export class StepThreeComponent {
  private _formBuilder = inject(FormBuilder)
  private _questionService = inject(QuestionsService);
  private _pageService = inject(BusinessPageService);
  private _submissionService = inject(SubmissionService);
  private _submissionStateService = inject(SubMissionStateService);

  questions: Question[] = [];
  formGroup: FormGroup = this._formBuilder.group({})
  fieldType = QuestionType;

  submission$ = new Observable<unknown>();
  questions$ = this._questionService.getQuestionsOfSubSection(IMPACT_ASSESMENT_SUBSECTION_IDS.STEP_THREE).pipe(tap(questions => {
    this.questions = questions
    this._createFormControls();
  }))

  currentEntries$ = this._submissionStateService.currentUserSubmission$;

  private _createFormControls() {
    this.questions.forEach(question => {
      this.formGroup.addControl('question_' + question.id, this._formBuilder.control('', Validators.required));
    });
  }
  setNextStep() {
    this._pageService.setCurrentPage(3)
  }
  goBack() {
    this._pageService.setCurrentStep(2);
  }

  handleSubmit() {
    const formValues = this.formGroup.value;
    const submissionData = this.questions.map(question => {
      const questionId = question.id;
      const openQuestion = question.answers.find(a => a.text === 'OPEN');
      const answerId = openQuestion ? openQuestion.id : formValues['question_' + question.id]
      return { questionId, answerId: parseInt(answerId), text: formValues['question_' + question.id] }
    });

    this.submission$ = this._submissionService.createMultipleSubmissions(submissionData).pipe(tap(() => {
      this.setNextStep();
    }))
  }
}
