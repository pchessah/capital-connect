import {Component, inject} from '@angular/core';
import { QuestionsService } from '../../../../questions/services/questions/questions.service';
import {Observable, tap} from 'rxjs';
import { Question } from '../../../../questions/interfaces';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-step-one',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './step-one.component.html',
  styleUrl: './step-one.component.scss'
})
export class StepOneComponent {
  private _formBuilder =inject(FormBuilder)
  private _questionService = inject(QuestionsService);
  formGroup: FormGroup =this._formBuilder.group({})
  // subsections$ = this._questionService.getSubSectionsOfaSection(5).pipe(tap(res => {
  //   debugger
  // }))
  submission$ =new Observable<unknown>()
  questions$ =  this._questionService.getQuestionsOfSubSection(12).pipe(tap(questions => {
    this.questions = questions
  }))
  questions: Question[] = [];

  handleSubmit(){
    const formValues =this.formGroup.value;
    const submissionData = this.questions.map(question => ({
      questionId: question.id,
      answerId: formValues['question_' + question.id]
    }));

    // this.submission$ = this._submissionService.createMultipleSubmissions(submissionData).pipe(tap(res => {
    //   this.setNextScreen()
    // }))
  }

}
