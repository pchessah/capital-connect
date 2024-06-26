import {Component, inject} from '@angular/core';
import {UiComponent} from "../../components/ui/ui.component";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import { Router} from "@angular/router";
import {FormStateService} from "../../services/form-state/form-state.service";
import { tap} from "rxjs";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-create-section',
  standalone: true,
  imports: [
    UiComponent, CommonModule, ReactiveFormsModule
  ],
  templateUrl: './create-section.component.html',
  styleUrl: './create-section.component.scss'
})
export class CreateSectionComponent {
  private _fb = inject(FormBuilder)
  private _router = inject(Router);
  private _formStateService = inject(FormStateService);

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

  nextStep() {
    this._formStateService.createSection().pipe(tap(_ =>{
      this.sectionForm.reset();
    })).subscribe();

  }

  cancel() {
    this._router.navigateByUrl('/questions')
  }
}
