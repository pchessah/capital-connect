import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, tap } from 'rxjs';
import { UiComponent } from "../../components/ui/ui.component";
import { FormStateService } from '../../services/form-state/form-state.service';
import { SharedModule } from '../../../../shared';
import { Section } from '../../interfaces';

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, UiComponent, SharedModule],
  templateUrl: './section.component.html',
  styleUrl: './section.component.scss'
})
export class SectionComponent {
  private _fb = inject(FormBuilder)
  private _formStateService = inject(FormStateService);
  private _router = inject(Router);

  sectionForm: FormGroup = this._fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required]
  });

  sectionForm$ = this.sectionForm.valueChanges.pipe(tap(vals => {
    this._formStateService.setSectionFormState(vals);
    this._formStateService.setSectionFormIsValid(this.sectionForm.valid);
  }))

  isSectionFormValid$ = this._formStateService.sectionFormIsValid$.pipe(tap(isValid => {
    this.isSectionFormValid = isValid;
  }))

  isSectionFormValid = false;
  nextOperation$: Observable<Section> = new Observable()

  nextStep() {
    this.nextOperation$ = this._formStateService.createSection().pipe(tap(res => {
      if (res.id) {
        this._router.navigate(['/questions/sub-section'], { state: { sectionId: res.id } });
      }
    }));
  }

  cancel() {
    this._router.navigateByUrl('/questions')
  }


}
