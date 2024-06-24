import {Component, inject} from '@angular/core';
import {QuestionsService} from "../../../../questions/services/questions/questions.service";
import {Observable, tap} from "rxjs";
import {Question, QuestionType} from "../../../../questions/interfaces";
import {CommonModule} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {BusinessPageService} from "../../../services/business-page/business.page.service";
import {SubmissionService} from "../../../../../shared";

@Component({
  selector: 'app-step-two',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
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

  // subsections$ = this._questionService.getSubSectionsOfaSection(5).pipe(tap(res => {
  //   debugger
  // }))

  submission$ =new Observable<unknown>()
  questions$ =  this._questionService.getQuestionsOfSubSection(13).pipe(tap(questions => {
    this.questions = questions
    this._createFormControls();
  }))


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
    const submissionData = this.questions.map(question => ({
      questionId: question.id,
      answerId: formValues['question_' + question.id]
    }));
    this.setNextStep();
    this.submission$ = this._submissionService.createMultipleSubmissions(submissionData).pipe(tap(res => {
      this.setNextStep();
    }))
  }
}
