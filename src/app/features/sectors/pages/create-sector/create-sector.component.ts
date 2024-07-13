import { Component, inject } from '@angular/core';
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { tap } from "rxjs";
import { UiComponent } from "../../components/ui/ui.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { FormStateService } from "../../services/form-state/form-state.service";

@Component({
  selector: 'app-create-sector',
  standalone: true,
  imports: [
    UiComponent, CommonModule, ReactiveFormsModule
  ],
  templateUrl: './create-sector.component.html',
  styleUrl: './create-sector.component.scss'
})
export class CreateSectorComponent {
  private _fb = inject(FormBuilder)
  private _router = inject(Router);
  private _formStateService = inject(FormStateService);

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

  isSectorFormValid = false;

  nextStep() {
    this._formStateService.createSector().pipe(tap(() => {
      this.sectorForm.reset();
    })).subscribe();

  }

  cancel() {
    this._router.navigateByUrl('/sectors')
  }
}
