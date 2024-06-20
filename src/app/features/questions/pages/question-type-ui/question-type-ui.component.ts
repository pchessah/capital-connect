import { Component } from '@angular/core';
import {QUESTION_FORM_STEPS} from "../../../../shared/interfaces/question.form.steps.enum";
import {UiComponent} from "../../components/ui/ui.component";

@Component({
  selector: 'app-question-type-ui',
  standalone: true,
  imports: [
    UiComponent
  ],
  templateUrl: './question-type-ui.component.html',
  styleUrl: './question-type-ui.component.scss'
})
export class QuestionTypeUiComponent {
    protected readonly STEPS = QUESTION_FORM_STEPS;
}
