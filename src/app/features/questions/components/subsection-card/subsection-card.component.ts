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
  questions_count =0;
  subsections$ =new Observable();
  private _questionService = inject(QuestionsService);
  ngOnInit(){
    this.subsections$ = this._questionService.getQuestionsOfSubSection(this.id).pipe(
      tap(questions => {
        this.questions_count = questions.length;
      }));
  }

  deleteSection(sectionId:number){
    if(confirm("Are you sure?")){
      this._questionService.removeSection(sectionId);
    }

  }
}
