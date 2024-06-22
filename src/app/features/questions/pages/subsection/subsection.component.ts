import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormStateService } from '../../services/form-state/form-state.service';
import { CommonModule } from '@angular/common';
import { Observable, tap } from 'rxjs';
import { SharedModule } from '../../../../shared';
import { Section, SubSection, SubSectionInput } from '../../interfaces';
import { Router } from '@angular/router';
import { QUESTION_FORM_STEPS } from "../../../../shared/interfaces/question.form.steps.enum";
import { UiComponent } from "../../components/ui/ui.component";
import { QuestionsService } from '../../services/questions/questions.service';

@Component({
  selector: 'app-subsection',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
    UiComponent
  ],
  templateUrl: './subsection.component.html',
  styleUrl: './subsection.component.scss'
})
export class SubSectionComponent implements OnInit {
  section!:Section;
  ngOnInit(): void {
    this._checkEditMode()
  }

  protected readonly STEPS = QUESTION_FORM_STEPS;

  private _fb = inject(FormBuilder);
  private _formStateService = inject(FormStateService);
  private _router = inject(Router);
  private _questionsService = inject(QuestionsService);

  private _navState: { sectionId: number, subsectionId: number } = this._router.getCurrentNavigation()?.extras.state as any;
  
  private _subsectionId: number = this._navState?.subsectionId;
  sectionId: number = this._navState?.sectionId

  subsectionForm = this._fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required]
  });

  subsectionForm$ = this.subsectionForm.valueChanges.pipe(tap(vals => {
    const input: SubSectionInput = {
      sectionId: this.sectionId,
      name: vals.name as string,
      description: vals.description as string
    }
    this._formStateService.setSubsectionForm(input);
    this._formStateService.setSubSectionFormIsValid(this.subsectionForm.valid);
  }));

  isSubsectionFormValid$ = this._formStateService.subsectionFormIsValid$.pipe(tap(isValid => {
    this.isSubsectionFormValid = isValid;
  }));

  fetchedSubSection$ = new Observable();
  fetchedSection$ = this._questionsService.getSingleSection(this.sectionId)

  nextOperation$: Observable<SubSection> = new Observable()

  isSubsectionFormValid = false;
  editMode = false;
  
  private _checkEditMode() {
    if (this._subsectionId) {
      this.editMode = true;
      this.fetchedSubSection$ = this._formStateService.getCurrentSubSectionBeingEdited(this._subsectionId).pipe(tap(subsection => {
        this.subsectionForm.patchValue({
          name: subsection.name,
          description: subsection.description
        });
      }))
    }
  }

  submit() {
    const call$ = this.editMode ? this._formStateService.updateSubsection(this.sectionId, this._subsectionId)
                                : this._formStateService.createSubsection(this.sectionId) 
    this.nextOperation$ = call$.pipe(tap(res => {
      this._router.navigate(['/questions'])
    }));
  }

  cancel() {
    this._router.navigate(['/questions'])
  }
}
