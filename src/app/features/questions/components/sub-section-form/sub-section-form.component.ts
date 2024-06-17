import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormStateService } from '../../services/form-state/form-state.service';
import { CommonModule } from '@angular/common';
import { tap } from 'rxjs';
import { SharedModule } from '../../../../shared';
import { SubSectionInput } from '../../interfaces';

@Component({
  selector: 'app-sub-section-form',
  standalone: true,
  imports: [CommonModule, SharedModule, ReactiveFormsModule],
  templateUrl: './sub-section-form.component.html',
  styleUrl: './sub-section-form.component.scss'
})
export class SubSectionFormComponent {
  private _fb = inject(FormBuilder)
  private _formStateService =  inject(FormStateService)

  subsectionForm = this._fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required]
  });

  subsectionForm$ = this.subsectionForm.valueChanges.pipe(tap(vals => {
    const sectionId = this._formStateService.currentDashBoardData.sectionId;
    const input: SubSectionInput = {
      sectionId: sectionId,
      name: vals.name as string,
      description: vals.description as string
    }
    this._formStateService.setSubsectionForm(input);
    this._formStateService.setSubSectionFormIsValid(this.subsectionForm.valid);
  }))




}
