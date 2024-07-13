import { Component, inject } from '@angular/core';
import { UiComponent } from "../../components/ui/ui.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { tap, switchMap, EMPTY, Observable } from 'rxjs';
import { SubSector, Sector } from '../../interfaces';
import { FormStateService } from '../../services/form-state/form-state.service';
import { SectorsService } from '../../services/sectors/sectors.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-sector',
  standalone: true,
  templateUrl: './edit-sector.component.html',
  styleUrl: './edit-sector.component.scss',
  imports: [UiComponent, CommonModule, ReactiveFormsModule]
})
export class EditSectorComponent {

  private _fb = inject(FormBuilder)
  private _router = inject(Router);
  private _formStateService = inject(FormStateService);
  private _sectorService = inject(SectorsService);
  private _activatedRoute = inject(ActivatedRoute);

  subsectors: SubSector[] = [];
  sectorForm: FormGroup = this._fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required]
  });

  sectorForm$ = this.sectorForm.valueChanges.pipe(tap(vals => {
    this._formStateService.setSectorFormState(vals);
    this._formStateService.setSectorFormIsValid(this.sectorForm.valid);
  }))

  isSectorFormValid$ = this._formStateService.sectorFormIsValid$.pipe(tap(isValid => {
    this.isSectorFormValid = isValid;
  }))

  fetchedSectors$ = this._activatedRoute.paramMap.pipe(switchMap(params => {
    const id = params.get('id');
    this.sectorId = Number(id);
    if (id) return this._sectorService.getSingleSector(this.sectorId);
    return EMPTY
  }), tap(res => {

    this.sectorForm.patchValue({
      name: res.name,
      description: res.description,
    });
    this.editMode = true
  }))

  subSections$ = this._activatedRoute.paramMap.pipe(tap((res) => {
    // @ts-ignore
    const id = Number(res.params.id);
    this._sectorService.getSubSectorOfaSector(id).pipe(tap(vals => {
      this.subsectors = vals;
    })).subscribe();
  }))

  sectorId!: number;

  isSectorFormValid = false;
  editMode = false;
  nextOperation$: Observable<Sector> = new Observable();

  nextStep() {
    const createSector$ = this._formStateService.createSector();
    const updateSection$ = this._formStateService.updateSector(this.sectorId);

    const call$ = this.editMode ? updateSection$ : createSector$
    this.nextOperation$ = call$.pipe(tap(res => {
      if (res.id) {
        // this._router.navigate(['/questions']);
      }
    }));
  }

  cancel() {
    this._router.navigateByUrl('/sectors')
  }
}
