import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";
import { RouterLink } from '@angular/router';
import { SharedModule } from "../../../../shared";
import { UiComponent } from "../../components/ui/ui.component";
import { QuestionsService } from '../../services/questions/questions.service';
import { SectionCardComponent } from "../../components/section-card/section-card.component";
import { AdminUiContainerComponent } from "../../../admin/components/admin-ui-container/admin-ui-container.component";


@Component({
  selector: 'app-saved-response',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    UiComponent,
    ReactiveFormsModule,
    SectionCardComponent,
    RouterLink,
    AdminUiContainerComponent
  ],
  templateUrl: './saved-response.component.html',
  styleUrl: './saved-response.component.scss'
})
export class SavedResponseComponent {

  private _questionService = inject(QuestionsService);

  sections$ = this._questionService.getAllSections()

  reFetchSections() {
    this.sections$ = this._questionService.getAllSections();
  }
}
