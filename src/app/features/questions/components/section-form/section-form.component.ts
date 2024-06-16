import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormStateService } from '../../services/form-state/form-state.service';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared';

@Component({
  selector: 'app-section-form',
  standalone: true,
  imports: [CommonModule, SharedModule, ReactiveFormsModule],
  templateUrl: './section-form.component.html',
  styleUrl: './section-form.component.scss'
})
export class SectionFormComponent {
  sectionForm: FormGroup;

  constructor(private _fb: FormBuilder, private _formStateService: FormStateService) {
    this.sectionForm = this._fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit() {
    this._formStateService.setSectionForm(this.sectionForm);
  }

}
