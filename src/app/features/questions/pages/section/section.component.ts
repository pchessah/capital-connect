import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EMPTY, Observable, switchMap, tap } from 'rxjs';
import { UiComponent } from "../../components/ui/ui.component";
import { FormStateService } from '../../services/form-state/form-state.service';
import { SharedModule } from '../../../../shared';
import {Section, SubSection} from '../../interfaces';
import { QuestionsService } from '../../services/questions/questions.service';
import {SubsectionCardComponent} from "../../components/subsection-card/subsection-card.component";

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, UiComponent, SharedModule, SubsectionCardComponent],
  templateUrl: './section.component.html',
  styleUrl: './section.component.scss'
})
export class SectionComponent {
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
        this._router.navigate(['/questions']);
      }
    }));
  }

  cancel() {
    this._router.navigateByUrl('/questions')
  }


}
