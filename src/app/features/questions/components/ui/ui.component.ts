import { Component } from '@angular/core';
import {NgIf, NgOptimizedImage} from "@angular/common";
import {QuestionUiComponent} from "../question-ui/question-ui.component";
import {QuestionSubsectionUiComponent} from "../question-subsection-ui/question-subsection-ui.component";
import {QuestionTypeUiComponent} from "../question-type-ui/question-type-ui.component";
import {AnswerUiComponent} from "../answer-ui/answer-ui.component";
import {QUESTION_FORM_STEPS} from "../../../../shared/interfaces/question.form.steps.enum";

@Component({
  selector: 'app-ui',
  standalone: true,
  imports: [
    NgOptimizedImage,
    QuestionUiComponent,
    QuestionSubsectionUiComponent,
    QuestionTypeUiComponent,
    AnswerUiComponent,
    NgIf,
  ],
  templateUrl: './ui.component.html',
  styleUrl: './ui.component.scss'
})
export class UiComponent {
  STEPS =QUESTION_FORM_STEPS;
  currentStep: QUESTION_FORM_STEPS = QUESTION_FORM_STEPS.PREVIEW;

  changeStep =(step: QUESTION_FORM_STEPS) =>{
    this.currentStep =step;
  }
}
