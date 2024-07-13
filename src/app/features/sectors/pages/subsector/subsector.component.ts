import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { switchMap, tap } from 'rxjs';
import { SharedModule } from '../../../../shared';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UiComponent } from "../../components/ui/ui.component";
import { SectorsService } from '../../services/sectors/sectors.service';
import { QuestionCardComponent } from '../../../questions/components/question-card/question-card.component';
import { Sector } from '../../interfaces';

@Component({
  selector: 'app-subsector',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
    UiComponent,
    QuestionCardComponent,
    RouterLink
  ],
  templateUrl: './subsector.component.html',
  styleUrl: './subsector.component.scss'
})
export class SubSectorComponent {
  sector!: Sector;
  sectorId!: number;
  subsectorName!: string;
  routeId!: string;

  private _activatedRoute = inject(ActivatedRoute);
  private _sectorsService = inject(SectorsService);

  sectionId!: number;

  init$ = this._activatedRoute.params.pipe(switchMap((res) => {
    this.routeId = res['id'].trim();
    const ids = this.routeId.split('-');
    this.sectionId = Number(ids.at(0))
    this.sectorId = Number(ids.at(1));
    return this._sectorsService.getSingleSubsector(this.sectorId);

  }), tap((subsectorInfo) => {
    this.subsectorName = subsectorInfo.name;
  }))

}
