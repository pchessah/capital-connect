import { Component, inject } from '@angular/core';
import { UiComponent } from "../../components/ui/ui.component";
import { Section, SubSection, SubSectionInput } from "../../interfaces";
import { QUESTION_FORM_STEPS } from "../../../../shared/interfaces/question.form.steps.enum";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { FormStateService } from "../../services/form-state/form-state.service";
import { QuestionsService } from "../../services/questions/questions.service";
import { Observable, tap } from "rxjs";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-edit-subsection',
  standalone: true,
  imports: [
    UiComponent, CommonModule, ReactiveFormsModule
  ],
  templateUrl: './edit-subsection.component.html',
  styleUrl: './edit-subsection.component.scss'
})
export class EditSubsectionComponent {
  fetchedSection$: Observable<Section> = new Observable();

  protected readonly STEPS = QUESTION_FORM_STEPS;
  private _activatedRoute = inject(ActivatedRoute);
  private _fb = inject(FormBuilder);
  private _formStateService = inject(FormStateService);
  private _router = inject(Router);
  private _questionsService = inject(QuestionsService);

  subSectionId!: number;
  sectionId!: number;

  subsectionForm = this._fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required]
  });

  params$ = this._activatedRoute.params.pipe(tap(param => {
    const ids = param['id'].split('-')
    this.sectionId = Number(ids.at(0));
    this.subSectionId = Number(ids.at(1));
    this.fetchedSection$ = this._questionsService.getSingleSection(this.sectionId)
    this.fetchedSubSection$ = this._formStateService.getCurrentSubSectionBeingEdited(this.subSectionId).pipe(tap(subsection => {
      this.subsectionForm.patchValue({
        name: subsection.name,
        description: subsection.description
      });
    }))
  }));

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

  nextOperation$: Observable<SubSection> = new Observable()

  isSubsectionFormValid = false;


  submit() {
    this._formStateService.updateSubsection(this.sectionId, this.subSectionId).subscribe();
  }

  cancel() {
    this._router.navigateByUrl(`/questions/section/${this.sectionId}`)
  }
}
