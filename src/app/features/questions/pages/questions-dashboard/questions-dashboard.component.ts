import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared';
import { UiComponent } from "../../components/ui/ui.component";
import {QuestionUiComponent} from "../question-ui/question-ui.component";

@Component({
    selector: 'app-questions-dashboard',
    standalone: true,
    templateUrl: './questions-dashboard.component.html',
    styleUrl: './questions-dashboard.component.scss',
  imports: [SharedModule, CommonModule, UiComponent, QuestionUiComponent]
})
export class QuestionsDashboardComponent {


}

