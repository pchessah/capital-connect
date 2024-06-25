import {Component, inject, Input} from '@angular/core';
import {Observable, tap} from "rxjs";
import {QuestionsService} from "../../services/questions/questions.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {MatIcon} from "@angular/material/icon";
import {AsyncPipe, NgIf} from "@angular/common";

@Component({
  selector: 'app-subsection-card',
  standalone: true,
  imports: [
    MatIcon,
    RouterLink,
    NgIf,
    AsyncPipe
  ],
  templateUrl: './subsection-card.component.html',
  styleUrl: './subsection-card.component.scss'
})
export class SubsectionCardComponent {
  @Input() id!:number;
  @Input() name!:string;
  questions_count =0;
  private _questionsService = inject(QuestionsService);
  private _activatedRoute = inject(ActivatedRoute)
  subsections$ =new Observable();
  private _questionService = inject(QuestionsService);
  ngOnInit(){
    this.subsections$ = this._questionService.getQuestionsOfSubSection(this.id).pipe(
      tap(questions => {
        this.questions_count = questions.length;
      }));
  }
  // subSections$ = this._activatedRoute.paramMap .pipe(tap((res) =>{
  //   // @ts-ignore
  //   const id =Number(res.params.id);
  //   this._questionsService.getSubSectionsOfaSection(id).pipe(tap(vals => {
  //     // this
  //   }));
  // }))

  deleteSection(sectionId:number){
    if(confirm("Are you sure?")){
      this._questionService.removeSection(sectionId);
    }

  }
}
