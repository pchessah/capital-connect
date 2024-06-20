import {Component, inject} from '@angular/core';
import {UiComponent} from "../../components/ui/ui.component";
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";

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
  private _formBuilder = inject(FormBuilder);
  private _router = inject(Router);

}
