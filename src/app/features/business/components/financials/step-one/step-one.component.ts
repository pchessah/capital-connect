import {Component, inject} from '@angular/core';
import { QuestionsService } from '../../../../questions/services/questions/questions.service';
import {Observable, tap} from 'rxjs';
import { Question } from '../../../../questions/interfaces';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {BusinessPageService} from "../../../services/business-page/business.page.service";
import {SubmissionService} from "../../../../../shared";

@Component({
  selector: 'app-step-one',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './step-one.component.html',
  styleUrl: './step-one.component.scss'
})
export class StepOneComponent {
  questions: Question[] = [];
  private _formBuilder =inject(FormBuilder)
  private _questionService = inject(QuestionsService);
  private _pageService = inject(BusinessPageService);
  private _submissionService = inject(SubmissionService);
  formGroup: FormGroup =this._formBuilder.group({})

  // subsections$ = this._questionService.getSubSectionsOfaSection(5).pipe(tap(res => {
  //   debugger
  // }))

  submission$ =new Observable<unknown>();
  questions$ =  this._questionService.getQuestionsOfSubSection(12).pipe(tap(questions => {
    this.questions = questions
    this._createFormControls();
  }))


  private _createFormControls() {
    this.questions.forEach(question => {
      this.formGroup.addControl('question_' + question.id, this._formBuilder.control('', Validators.required));
    });
  }
  setNextStep(){
    this._pageService.setCurrentStep(2)
  }
  goBack(){
    this._pageService.setCurrentPage(1);
  }

  handleSubmit(){
    const formValues =this.formGroup.value;
    console.log(formValues)
    
    const submissionData = this.questions.map(question => ({
      questionId: question.id,
      answerId: question.answers.find(a => a.text === 'OPEN')?.text === 'OPEN' ? question.answers.find(a => a.text === 'OPEN')?.id :  formValues['question_' + question.id],
      text: formValues['question_' + question.id]
    }));

    this.submission$ = this._submissionService.createMultipleSubmissions(submissionData).pipe(tap(res => {
      this.setNextStep();
    }))
  }

}
