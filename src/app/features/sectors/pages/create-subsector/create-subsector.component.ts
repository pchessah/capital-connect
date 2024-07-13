import { Component, inject } from '@angular/core';
import { Sector, SubSectorInput } from "../../interfaces";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { FormStateService } from "../../services/form-state/form-state.service";
import { SectorsService } from "../../services/sectors/sectors.service";
import { CommonModule } from "@angular/common";
import { tap } from "rxjs";
import { UiComponent } from "../../components/ui/ui.component";

@Component({
  selector: 'app-create-subsector',
  standalone: true,
  imports: [
    ReactiveFormsModule, CommonModule, UiComponent
  ],
  templateUrl: './create-subsector.component.html',
  styleUrl: './create-subsector.component.scss'
})
export class CreateSubsectorComponent {
  private _activatedRoute = inject(ActivatedRoute);
  private _fb = inject(FormBuilder);
  private _formStateService = inject(FormStateService);
  private _router = inject(Router);
  private _sectorService = inject(SectorsService);

  sector!: Sector;
  sectorId!: number;

  subsectorForm = this._fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required]
  });

  init$= this._activatedRoute.paramMap.pipe(tap((res) => {
    // @ts-ignore
    const id = Number(res.params['id']);
    this.sectorId = id;
    this._sectorService.getSingleSector(id).pipe(tap(vals => {
      this.sector = vals;
    })).subscribe()
  }))


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

  isSubsectorFormValid = false;

  submit() {
    this._formStateService.createSubsector(this.sectorId).pipe(tap(() => {
      this.subsectorForm.reset()
    })).subscribe()

  }

  cancel() {
    this._router.navigateByUrl(`/sectors/sector/${this.sectorId}`);
  }
}
