import { Component } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {QuestionUiComponent} from "../question-ui/question-ui.component";

@Component({
  selector: 'app-ui',
  standalone: true,
  imports: [
    NgOptimizedImage,
    QuestionUiComponent
  ],
  templateUrl: './ui.component.html',
  styleUrl: './ui.component.scss'
})
export class UiComponent {

}
