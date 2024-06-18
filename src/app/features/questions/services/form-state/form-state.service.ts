import { inject, Injectable, signal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { QuestionsService } from '../questions/questions.service';
import { CurrentDashboardInput, Section, SectionInput, SubSectionInput } from '../../interfaces';
import { SessionStorageService } from '../../../../core/services/session-storage/session-storage.service';
import { FeedbackService } from '../../../../core';

@Injectable({
  providedIn: 'root'
})
export class FormStateService {

  private _questionsService = inject(QuestionsService)
  private _sessionStorageService = inject(SessionStorageService)
  private _feedbackService = inject(FeedbackService)

  private _sectionFormStateSrc = new BehaviorSubject<SectionInput>(null as any);
  private _sectionFormIsValid = new BehaviorSubject<boolean>(false);

  private _subsectionFormStateSrc = new BehaviorSubject<SubSectionInput>(null as any);
  private _subsectionFormIsValid = new BehaviorSubject<boolean>(false);

  private _currentDashboardDataSrc = new BehaviorSubject<CurrentDashboardInput>(this._sessionStorageService.getObject('currentDashboardInput') as any);

  sectionFormState$ = this._sectionFormStateSrc.asObservable();
  sectionFormIsValid$ = this._sectionFormIsValid.asObservable();

  subsectionFormState$ = this._subsectionFormStateSrc.asObservable();
  subsectionFormIsValid$ = this._subsectionFormIsValid.asObservable();

  currentDashboardData$ = this._currentDashboardDataSrc.asObservable() 
  
  setSectionFormState(sectionInput: SectionInput) {
    this._sectionFormStateSrc.next(sectionInput);
  }
  
  setSectionFormIsValid(sectionIsValid: boolean) {
    this._sectionFormIsValid.next(sectionIsValid);
  }
  
  createSection(){
    const sectionInput:SectionInput = this._sectionFormStateSrc.value;
    return this._questionsService.createSection(sectionInput).pipe(tap(res => {
      this._feedbackService.success('Section added successfully');
      const dashboardInput:CurrentDashboardInput = {...this._currentDashboardDataSrc.value, sectionId: res.id }
      this.setCurrentDashboardData(dashboardInput);
    }));
  }

  setCurrentDashboardData(dashboardData:CurrentDashboardInput) {
    this._sessionStorageService.setObject('currentDashboardInput', (dashboardData))
    this._currentDashboardDataSrc.next(dashboardData)
  }

  clearDashboardData() {
    this._sessionStorageService.removeObject('currentDashboardInput')
    this._currentDashboardDataSrc.next(null as any)
  }

  get currentDashBoardData() {
    return this._currentDashboardDataSrc.value
  }
  
  setSubsectionForm(val: SubSectionInput) {
    this._subsectionFormStateSrc.next(val);
  }

  setSubSectionFormIsValid(val: boolean) {
    this._subsectionFormIsValid.next(val);
  }

  createSubsection() {
    const sectionId = this.currentDashBoardData.sectionId;
    if(!sectionId) this._feedbackService.error('Could not find section');
    const input:SubSectionInput = { ...this._subsectionFormStateSrc.value, sectionId: sectionId }
    return this._questionsService.createSubSection(input).pipe(tap(res => {
      this._feedbackService.success('SubSection added successfully');
      const dashboardInput:CurrentDashboardInput = {...this.currentDashBoardData, subsectionId: res.id }
      this.setCurrentDashboardData(dashboardInput);
    }))
  }


  private _questionFormState =  new BehaviorSubject<FormGroup | null>(null);

  questionForm$ = this._questionFormState.asObservable();

  setQuestionForm(form: FormGroup) {
    this._questionFormState.next(form);
  }

  get questionForm() {
    return this._questionFormState.value;
  }
}
