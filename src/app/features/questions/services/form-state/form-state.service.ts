import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormStateService {

  private _sectionFormState = new BehaviorSubject<FormGroup | null>(null);
  private _subsectionFormState = new BehaviorSubject<FormGroup | null>(null);
  private _questionFormState = new BehaviorSubject<FormGroup | null>(null);

  setSectionForm(form: FormGroup) {
    this._sectionFormState.next(form);
  }

  getSectionForm() {
    return this._sectionFormState.asObservable();
  }

  setSubsectionForm(form: FormGroup) {
    this._subsectionFormState.next(form);
  }

  getSubsectionForm() {
    return this._subsectionFormState.asObservable();
  }

  setQuestionForm(form: FormGroup) {
    this._questionFormState.next(form);
  }

  getQuestionForm() {
    return this._questionFormState.asObservable();
  }
}
