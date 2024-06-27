import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { switchMap, tap } from 'rxjs';
import { UiComponent } from "../../components/ui/ui.component";
import { SharedModule } from '../../../../shared';
import { SubSection } from '../../interfaces';
import { QuestionsService } from '../../services/questions/questions.service';
import { SubsectionCardComponent } from "../../components/subsection-card/subsection-card.component";

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, UiComponent, SharedModule, SubsectionCardComponent, RouterLink],
  templateUrl: './section.component.html',
  styleUrl: './section.component.scss'
})
export class SectionComponent {
  private _questionsService = inject(QuestionsService);
  private _activatedRoute = inject(ActivatedRoute);
  subsections: SubSection[] = [];
  sectionName!: string;
  sectionId!: number;

  init$ = this.getSubsections();
    getSubsections() {
      return this._activatedRoute.paramMap.pipe(
        switchMap(res => {
          const id = Number((res as any).params.id);
          this.sectionId = id;
          return this._questionsService.getSingleSection(id)
        }),
        switchMap((res) => {
          this.sectionName = res.name;
          return this._questionsService.getSubSectionsOfaSection(res.id)
        }), (tap(vals => {
          this.subsections = vals;
        })))
    }


  reFetchSubsections(){
    this.init$ = this.getSubsections();
  }

}
