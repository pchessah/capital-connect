import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { QuestionsService } from '../questions/questions.service';
import { Answer, AnswerInput, CurrentDashboardInput, Question, QuestionInput, Section, SectionInput, SubSection, SubSectionInput } from '../../interfaces';
import { FeedbackService } from '../../../../core';

@Injectable({
  providedIn: 'root'
})
export class FormStateService {

  private _questionsService = inject(QuestionsService);
  private _feedbackService = inject(FeedbackService)

  private _sectionFormStateSrc = new BehaviorSubject<SectionInput>(null as any);
  private _sectionFormIsValid = new BehaviorSubject<boolean>(false);

  private _subsectionFormStateSrc = new BehaviorSubject<SubSectionInput>(null as any);
  private _subsectionFormIsValid = new BehaviorSubject<boolean>(false);

  private _questionFormStateSrc = new BehaviorSubject<QuestionInput>(null as any);
  private _questionFormIsValid = new BehaviorSubject<boolean>(false);

  private _answerFormStateSrc = new BehaviorSubject<AnswerInput>(null as any);
  private _answerFormIsValid = new BehaviorSubject<boolean>(false);

  private _currentDashboardDataSrc = new BehaviorSubject<CurrentDashboardInput>(sessionStorage.getItem('currentDashboardInput') as any);

  sectionFormState$ = this._sectionFormStateSrc.asObservable();
  sectionFormIsValid$ = this._sectionFormIsValid.asObservable();

  subsectionFormState$ = this._subsectionFormStateSrc.asObservable();
  subsectionFormIsValid$ = this._subsectionFormIsValid.asObservable();

  questionForm$ = this._questionFormStateSrc.asObservable();
  questionFormIsValid$ = this._questionFormIsValid.asObservable();

  answerForm$ = this._answerFormStateSrc.asObservable();
  answerFormIsValid$ = this._answerFormIsValid.asObservable();


  currentDashboardData$ = this._currentDashboardDataSrc.asObservable();

  setSectionFormState(sectionInput: SectionInput) {
    this._sectionFormStateSrc.next(sectionInput);
  }

  setSectionFormIsValid(sectionIsValid: boolean) {
    this._sectionFormIsValid.next(sectionIsValid);
  }

  createSection() {
    const sectionInput: SectionInput = this._sectionFormStateSrc.value;
    return this._questionsService.createSection(sectionInput).pipe(tap(res => {
      this._feedbackService.success('Section added successfully');
    }));
  }

  updateSection(sectionId: number) {
    const sectionInput: Section = {...this._sectionFormStateSrc.value, id:sectionId};
    return this._questionsService.updateSection(sectionInput)
  }

  setCurrentDashboardData(dashboardData: CurrentDashboardInput) {
    sessionStorage.setItem('currentDashboardInput', JSON.stringify(dashboardData))
    this._currentDashboardDataSrc.next(dashboardData)
  }

  clearDashboardData() {
    sessionStorage.removeItem('currentDashboardInput')
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

  createSubsection(sectionId: number) {
    if (!sectionId) {
      this._feedbackService.error('Could not find section');
      throw new Error("Could not find section");

    };
    const input: SubSectionInput = { ...this._subsectionFormStateSrc.value, sectionId: sectionId }
    return this._questionsService.createSubSection(input).pipe(tap(res => {
      this._feedbackService.success('SubSection added successfully');
      // const dashboardInput: CurrentDashboardInput = { ...this.currentDashBoardData, subsectionId: res.id }
      // this.setCurrentDashboardData(dashboardInput);
    }))
  }

  updateSubsection(sectionId: number, subsectionid:number) {
    if (!sectionId) {
      this._feedbackService.error('Could not find section');
      throw new Error("Could not find section");

    };
    const input = { ...this._subsectionFormStateSrc.value, sectionId: sectionId, id: subsectionid }
    return this._questionsService.updateSubSection(input).pipe(tap(res => {
      this._feedbackService.success('SubSection added successfully');
      // const dashboardInput: CurrentDashboardInput = { ...this.currentDashBoardData, subsectionId: res.id }
      // this.setCurrentDashboardData(dashboardInput);
    }))
  }



  setQuestionForm(val: QuestionInput) {
    this._questionFormStateSrc.next(val);
  }

  setQuestionFormIsValid(val: boolean) {
    this._questionFormIsValid.next(val);
  }

  createQuestion(subsectionId:number) {

    if (!subsectionId) {
      this._feedbackService.error('Could not find subsection');
      throw new Error('Could not find subsection');
    }

    const input: QuestionInput = { ...this._questionFormStateSrc.value, subSectionId: subsectionId }

    return this._questionsService.createQuestion(input).pipe(tap(res => {
      this._feedbackService.success('Question added successfully')
      // const dashboardInput: CurrentDashboardInput = { ...this.currentDashBoardData, questionId: res.id }
      // this.setCurrentDashboardData(dashboardInput);
    }))
  }

  updateQuestion(question:Question, subSectionId:number){
    const input = { ...question, ...this._questionFormStateSrc.value, subSectionId }
    return this._questionsService.updateQuestion(input).pipe(tap(res => {
      this._feedbackService.success('Question updated successfully')
      // const dashboardInput: CurrentDashboardInput = { ...this.currentDashBoardData, questionId: res.id }
      // this.setCurrentDashboardData(dashboardInput);
    }))
  }

  getCurrentSubSectionBeingEdited(id:number) {
    const subSectionId = id ?? this.currentDashBoardData.subsectionId;
    return this._questionsService.getSingleSubsection(subSectionId)
  }

  setAnswerForm(val: AnswerInput){
    this._answerFormStateSrc.next(val)
  }

  setAnswerFormIsValid(val:boolean){
    this._answerFormIsValid.next(val)
  }

  createAnswer(questionId: number){

    if (!questionId) {
      this._feedbackService.error('Could not find question');
      throw new Error('Could not find question');
    }

    const input: AnswerInput = { ...this._answerFormStateSrc.value, questionId: questionId }
    return this._questionsService.createAnswer(input).pipe(tap(res => {
      this._feedbackService.success('Question added successfully')
      // const dashboardInput: CurrentDashboardInput = { ...this.currentDashBoardData, questionId: res.id }
      // this.setCurrentDashboardData(dashboardInput);
    }))
  }

  editAnswer(answer:Answer,questionId: number){

    if (!questionId) {
      this._feedbackService.error('Could not find question');
      throw new Error('Could not find question');
    }

    const input: Answer = { ...answer, ...this._answerFormStateSrc.value }
    //  
    return this._questionsService.updateAnswer(input, questionId).pipe(tap(res => {
      this._feedbackService.success('Answer updated successfully')
      // const dashboardInput: CurrentDashboardInput = { ...this.currentDashBoardData, questionId: res.id }
      // this.setCurrentDashboardData(dashboardInput);
    }))
  }

  getCurrentQuestionBeingEdited(questionId: number) {
    if (!questionId) {
      this._feedbackService.error('Could not find question');
      throw new Error('Could not find question');
    }
    return this._questionsService.getSingleQuestion(questionId)
  }

}
