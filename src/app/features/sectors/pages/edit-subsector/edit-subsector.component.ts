import { Component, inject } from '@angular/core';
import { UiComponent } from "../../components/ui/ui.component";
import { Sector, SubSector, SubSectorInput } from "../../interfaces";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { FormStateService } from "../../services/form-state/form-state.service";
import { SectorsService } from "../../services/sectors/sectors.service";
import { Observable, tap } from "rxjs";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-edit-subsection',
  standalone: true,
  imports: [
    UiComponent, CommonModule, ReactiveFormsModule
  ],
  templateUrl: './edit-subsector.component.html',
  styleUrl: './edit-subsector.component.scss'
})
export class EditSubSectorComponet {
  fetchedSector$: Observable<Sector> = new Observable();

  private _activatedRoute = inject(ActivatedRoute);
  private _fb = inject(FormBuilder);
  private _formStateService = inject(FormStateService);
  private _router = inject(Router);
  private _sectorService = inject(SectorsService);

  subSectorId!: number;
  sectorId!: number;

  subsectorForm = this._fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required]
  });

  params$ = this._activatedRoute.params.pipe(tap(param => {
    const ids = param['id'].split('-')
    this.sectorId = Number(ids.at(0));
    this.subSectorId = Number(ids.at(1));
    this.fetchedSector$ = this._sectorService.getSingleSubsector(this.sectorId)
    this.fetchedSubSector$ = this._formStateService.getCurrentSubSectorBeingEdited(this.subSectorId).pipe(tap(subsector => {
      this.subsectorForm.patchValue({
        name: subsector.name,
        description: subsector.description
      });
    }))
  }));

  subsectorForm$ = this.subsectorForm.valueChanges.pipe(tap(vals => {
    const input: SubSectorInput = {
      sectorId: this.sectorId,
      name: vals.name as string,
      description: vals.description as string
    }
    this._formStateService.setSubsectionForm(input);
    this._formStateService.setSubSectionFormIsValid(this.subsectorForm.valid);
  }));

  isSubsectorFormValid$ = this._formStateService.subsectorFormIsValid$.pipe(tap(isValid => {
    this.isSubsectorFormValid = isValid;
  }));

  fetchedSubSector$ = new Observable();

  nextOperation$: Observable<SubSector> = new Observable()

  isSubsectorFormValid = false;


  submit() {
    this._formStateService.updateSubSector(this.sectorId, this.subSectorId).subscribe();
  }

  cancel() {
    this._router.navigateByUrl(`/sectors/sector/${this.sectorId}`)
  }
}
