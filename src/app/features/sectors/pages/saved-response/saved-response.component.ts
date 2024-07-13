import { Component, inject } from '@angular/core';
import { SharedModule } from "../../../../shared";
import { UiComponent } from "../../components/ui/ui.component";
import {RouterLink} from '@angular/router';
import { QuestionsService } from '../../services/questions/questions.service';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import { SectorCard } from '../../components/sector-card/sector-card.component';


@Component({
  selector: 'app-saved-response',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    UiComponent,
    ReactiveFormsModule,
    SectorCard,
    RouterLink
  ],
  templateUrl: './saved-response.component.html',
  styleUrl: './saved-response.component.scss'
})
export class SavedResponseComponent {

  private _questionService = inject(QuestionsService);


  sections$ = this._questionService.getAllSections()

  reFetchSections(){
    this.sections$ = this._questionService.getAllSections();
  }
}
