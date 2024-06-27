import { Component, inject, Input } from '@angular/core';
import { SharedModule } from "../../../../shared";
import { CommonModule } from "@angular/common";
import { Observable } from "rxjs";
import { QuestionsService } from "../../services/questions/questions.service";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-section-card',
  standalone: true,
  imports: [SharedModule, CommonModule, RouterLink],
  templateUrl: './section-card.component.html',
  styleUrl: './section-card.component.scss'
})
export class SectionCardComponent {
  @Input() name!: string;
  @Input() id!: number;

  private _questionService = inject(QuestionsService);
  delete$: Observable<void> = new Observable()

  deleteSection(sectionId: number) {
    if (confirm("Are you sure?")) {
      this.delete$ =
        this._questionService.removeSection(sectionId);
    }

  }
}
