import { Component } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {QuestionUiComponent} from "../question-ui/question-ui.component";
import {QuestionSubsectionUiComponent} from "../question-subsection-ui/question-subsection-ui.component";
import {QuestionTypeUiComponent} from "../question-type-ui/question-type-ui.component";
import {AnswerUiComponent} from "../answer-ui/answer-ui.component";

@Component({
  selector: 'app-ui',
  standalone: true,
  imports: [
    NgOptimizedImage,
    QuestionUiComponent,
    QuestionSubsectionUiComponent,
    QuestionTypeUiComponent,
    AnswerUiComponent,
  ],
  templateUrl: './ui.component.html',
  styleUrl: './ui.component.scss'
})
export class UiComponent {

}
