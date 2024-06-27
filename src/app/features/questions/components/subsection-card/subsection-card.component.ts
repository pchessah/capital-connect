import {Component, inject, Input} from '@angular/core';
import {Observable, tap} from "rxjs";
import {QuestionsService} from "../../services/questions/questions.service";
import { RouterLink} from "@angular/router";
import {MatIcon} from "@angular/material/icon";
import { CommonModule} from "@angular/common";

@Component({
  selector: 'app-subsection-card',
  standalone: true,
  imports: [
    MatIcon,
    RouterLink,
    CommonModule
  ],
  templateUrl: './subsection-card.component.html',
  styleUrl: './subsection-card.component.scss'
})
export class SubsectionCardComponent {
  @Input() id!:number;
  @Input() name!:string;
  @Input() sectionId!:number;

  private _questionService = inject(QuestionsService);


  deleteSection(sectionId:number){
    if(confirm("Are you sure?")){
      this._questionService.removeSection(sectionId);
    }

  }
}
