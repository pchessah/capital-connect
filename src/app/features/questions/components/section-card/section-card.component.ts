import {Component, inject, Input} from '@angular/core';
import {SharedModule} from "../../../../shared";
import { CommonModule} from "@angular/common";
import {Observable, tap} from "rxjs";
import {QuestionsService} from "../../services/questions/questions.service";
import {RouterLink} from "@angular/router";

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
  sections_count =0;
  subsections$ =new Observable();
  private _questionService = inject(QuestionsService);
  ngOnInit(){
    this.subsections$ = this._questionService.getSectionQuestions(this.id).pipe(
      tap(subsections => {
        this.sections_count = subsections.length;
      })
    );
  }

  deleteSection(sectionId:number){
    if(confirm("Are you sure?")){
      this._questionService.removeSection(sectionId);
    }

  }
}
