import { Component } from '@angular/core';
import {QUESTION_FORM_STEPS} from "../../../../shared/interfaces/question.form.steps.enum";
import {AnswerUiComponent} from "../answer-ui/answer-ui.component";
import {NgIf} from "@angular/common";
import {QuestionSubsectionUiComponent} from "../question-subsection-ui/question-subsection-ui.component";
import {QuestionTypeUiComponent} from "../question-type-ui/question-type-ui.component";
import {UiComponent} from "../../components/ui/ui.component";

@Component({
  selector: 'app-question-ui',
  standalone: true,
  imports: [
    UiComponent
  ],
  templateUrl: './question-ui.component.html',
  styleUrl: './question-ui.component.scss'
})
export class QuestionUiComponent {
    protected readonly STEPS = QUESTION_FORM_STEPS;
}
