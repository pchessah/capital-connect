import { Component, inject } from '@angular/core';
import { UiComponent } from "../../components/ui/ui.component";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { tap, switchMap, EMPTY, Observable } from 'rxjs';
import { SubSection, Section } from '../../interfaces';
import { FormStateService } from '../../services/form-state/form-state.service';
import { QuestionsService } from '../../services/questions/questions.service';
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
  private _questionsService = inject(QuestionsService);
  private _activatedRoute = inject(ActivatedRoute);
  subsections: SubSection[] =[];
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

  fetchedSection$ = this._activatedRoute.paramMap .pipe(switchMap(params => {
    const id = params.get('id');
    this.sectionId = Number(id);
    if(id) return  this._questionsService.getSingleSection(this.sectionId);
    return EMPTY
  }), tap(res => {

    this.sectionForm.patchValue({
      name: res.name,
      description: res.description,
    });
    this.editMode = true
  }))

  subSections$ = this._activatedRoute.paramMap .pipe(tap((res) =>{
    // @ts-ignore
    const id =Number(res.params.id);
    this._questionsService.getSubSectionsOfaSection(id).pipe(tap(vals => {
      this.subsections =vals;
    })).subscribe();
  }))

  sectionId!: number;

  isSectionFormValid = false;
  editMode = false;
  nextOperation$: Observable<Section> = new Observable();

  nextStep() {
    const createSection$ = this._formStateService.createSection();
    const updateSection$ = this._formStateService.updateSection(this.sectionId);

    const call$ = this.editMode ? updateSection$ : createSection$
    this.nextOperation$ = call$.pipe(tap(res => {
      if (res.id) {
        // this._router.navigate(['/questions']);
      }
    }));
  }

  cancel() {
    this._router.navigateByUrl('/questions')
  }
}
