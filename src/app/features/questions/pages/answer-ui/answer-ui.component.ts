import { Component } from '@angular/core';
import {QUESTION_FORM_STEPS} from "../../../../shared/interfaces/question.form.steps.enum";
import {UiComponent} from "../../components/ui/ui.component";

@Component({
  selector: 'app-answer-ui',
  standalone: true,
  imports: [
    UiComponent
  ],
  templateUrl: './answer-ui.component.html',
  styleUrl: './answer-ui.component.scss'
})
export class AnswerUiComponent {

  protected readonly STEPS = QUESTION_FORM_STEPS;
}
