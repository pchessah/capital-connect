import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { switchMap, tap } from 'rxjs';
import { UiComponent } from "../../components/ui/ui.component";
import { SharedModule } from '../../../../shared';
import { SectorsService } from '../../services/sectors/sectors.service';
import { SubsectorCardComponent } from "../../components/subsector-card/subsector-card.component";
import { SubSector } from '../../interfaces';

@Component({
  selector: 'app-sector',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, UiComponent, SharedModule, SubsectorCardComponent, RouterLink],
  templateUrl: './sector.component.html',
  styleUrl: './sector.component.scss'
})
export class SectorComponent {
  private _sectorService = inject(SectorsService);
  private _activatedRoute = inject(ActivatedRoute);
  
  subsectors: SubSector[] = [];
  sectorName!: string;
  sectorId!: number;

  init$ = this.getSubsectors();
  getSubsectors() {
    return this._activatedRoute.paramMap.pipe(
      switchMap(res => {
        const id = Number((res as any).params.id);
        this.sectorId = id;
        return this._sectorService.getSingleSector(id)
      }),
      switchMap((res) => {
        this.sectorName = res.name;
        return this._sectorService.getSubSectorOfaSector(res.id)
      }), (tap(vals => {
        this.subsectors = vals;
      })))
  }


  reFetchSubsectors() {
    this.init$ = this.getSubsectors();
  }

}
