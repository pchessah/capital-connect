import { Component } from '@angular/core';
import {QUESTION_FORM_STEPS} from "../../../../shared/interfaces/question.form.steps.enum";
import {UiComponent} from "../../components/ui/ui.component";

@Component({
  selector: 'app-question-subsection-ui',
  standalone: true,
  imports: [
    UiComponent
  ],
  templateUrl: './question-subsection-ui.component.html',
  styleUrl: './question-subsection-ui.component.scss'
})
export class QuestionSubsectionUiComponent {

    protected readonly STEPS = QUESTION_FORM_STEPS;
}
