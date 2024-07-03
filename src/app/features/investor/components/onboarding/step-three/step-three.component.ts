import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Question, QuestionType } from "../../../../questions/interfaces";
import { QuestionsService } from "../../../../questions/services/questions/questions.service";
import { Submission, SubmissionService, SubMissionStateService, UserSubmissionResponse } from "../../../../../shared";
import { combineLatest, Observable, tap } from "rxjs";
import { INVESTOR_ONBOARDING_SUBSECTION_IDS } from "../../../../../shared/business/services/onboarding.questions.service";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { InvestorScreensService } from "../../../services/investor.screens.service";

@Component({
  selector: 'app-step-three',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './step-three.component.html',
  styleUrls: ['./step-three.component.scss']
})
export class StepThreeComponent implements OnInit {
  questions: Question[] = [];
  field_type = QuestionType;

  private _formBuilder = inject(FormBuilder);
  private _questionService = inject(QuestionsService);
  private _pageService = inject(InvestorScreensService);
  private _submissionService = inject(SubmissionService);
  private _submissionStateService = inject(SubMissionStateService);

  formGroup!: FormGroup;
  submission$!: Observable<unknown>;
  questions$!: Observable<Question[]>;
  currentEntries$!: Observable<UserSubmissionResponse[]>;
  init$!: Observable<[Question[], UserSubmissionResponse[]]>;

  ngOnInit() {
    this.formGroup = this._formBuilder.group({});
    this.questions$ = this._questionService.getQuestionsOfSubSection(INVESTOR_ONBOARDING_SUBSECTION_IDS.STEP_THREE).pipe(
      tap(questions => {
        this.questions = questions;
        this._createFormControls();
      })
    );

    this.currentEntries$ = this._submissionStateService.currentUserSubmission$;
    // this.init$ = combineLatest([this.questions$, this.currentEntries$]).pipe(tap(res => {
    //   if (this._hasMatchingQuestionId(res[0], res[1])) {
    //     this.setNextStep();
    //   }
    // }));
  }

  private _hasMatchingQuestionId(questions: Question[], responses: UserSubmissionResponse[]): boolean {
    const responseQuestionIds = new Set(responses.map(response => response.question.id));
    return questions.some(question => responseQuestionIds.has(question.id));
  }

  private _createFormControls() {
    this.questions.forEach(question => {
      if (question.type === this.field_type.MULTIPLE_CHOICE) {
        this.formGroup.addControl('question_' + question.id, this._formBuilder.array([], Validators.required));
      } else {
        this.formGroup.addControl('question_' + question.id, this._formBuilder.control('', Validators.required));
      }
    });
  }

  onCheckboxChange(questionId: number, event: any) {
    const formArray: FormArray = this.formGroup.get('question_' + questionId) as FormArray;
    if (event.target.checked) {
      formArray.push(new FormControl(Number(event.target.value)));
    } else {
      const index = formArray.controls.findIndex(x => x.value === Number(event.target.value));
      formArray.removeAt(index);
    }
  }

  handleSubmit() {
    const formValues = this.formGroup.value;
    const submissionData: Submission[] = [];

    this.questions.forEach(question => {
      if (question.type === this.field_type.MULTIPLE_CHOICE) {
        const selectedAnswers = formValues['question_' + question.id];
        selectedAnswers.forEach((answerId: number) => {
          submissionData.push({
            questionId: question.id,
            answerId: answerId,
            text: ''
          });
        });
      } else {
        submissionData.push({
          questionId: question.id,
          answerId: Number(formValues['question_' + question.id]),
          text: question.type !== this.field_type.SINGLE_CHOICE && question.type !== this.field_type.TRUE_FALSE ? formValues['question_' + question.id] : ''
        });
      }
    });

    console.log(submissionData);
    this.submission$ = this._submissionService.createMultipleSubmissions(submissionData).pipe(tap(res => {
      this.setNextStep();
    }));
  }

  setNextStep() {
    this._pageService.setCurrentScreen(3);
  }

  goBack() {
    this._pageService.setCurrentStep(2);
  }
}
