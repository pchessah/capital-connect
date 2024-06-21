import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { SharedModule } from '../../../../shared';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { tap } from 'rxjs';
import { OrganizationOnboardService } from '../../services/organization-onboard.service';

@Component({
  selector: 'app-step-one',
  standalone: true,
  imports: [CommonModule, SharedModule, ReactiveFormsModule],
  templateUrl: './step-one.component.html',
  styleUrl: './step-one.component.scss'
})
export class StepOneComponent {

  private _fb = inject(FormBuilder)
  private _orgStateService = inject(OrganizationOnboardService)

  stepOneForm: FormGroup = this._fb.group({
    name: ['', Validators.required],
    country: ['Kenya', Validators.required],  // Default value set to Kenya
    businessSector: ['', Validators.required],
    productsAndServices: ['', Validators.required]
  });

  stepOneForm$ = this.stepOneForm.valueChanges.pipe(tap(vals => {
    this._orgStateService.step1isValid.set(this.stepOneForm.valid)
    if (this.stepOneForm.valid) {
      debugger
      this._orgStateService.updateCompanyInput(vals)
    }
  }))
  countries: string[] = ['Kenya', 'United States', 'Canada', 'United Kingdom', 'Australia', 'Germany', 'France', 'Japan', 'China', 'India'];
  sectors: string[] = ['Venture Capital', 'Ecommerce', 'Technology', 'Healthcare', 'Finance', 'Education', 'Manufacturing', 'Retail', 'Transportation', 'Agriculture'];
  productsAndServices: string[] = ['FMCG', 'Fintech', 'Software', 'Consulting', 'Logistics', 'Telecommunications', 'Biotechnology', 'Construction', 'Energy', 'Tourism'];



}
