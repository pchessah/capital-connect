import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormStateService } from '../../services/form-state/form-state.service';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared';

@Component({
  selector: 'app-sub-section-form',
  standalone: true,
  imports: [CommonModule, SharedModule, ReactiveFormsModule],
  templateUrl: './sub-section-form.component.html',
  styleUrl: './sub-section-form.component.scss'
})
export class SubSectionFormComponent {
  subsectionForm: FormGroup;

  constructor(private fb: FormBuilder, private formStateService: FormStateService) {
    this.subsectionForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.formStateService.setSubsectionForm(this.subsectionForm);
  }

}
