import { Injectable } from '@angular/core';
import { BASE_URL, BaseHttpService } from '../../../../core';
import { HttpClient } from '@angular/common/http';
import { Answer, AnswerInput, Question, QuestionInput, Section, SectionInput, SubSection, SubSectionInput } from '../../interfaces';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService extends BaseHttpService {

  constructor(private _httpClient: HttpClient) {
    super(_httpClient)
  }

  //sections
  createSection(section: SectionInput) {
    return this.create(`${BASE_URL}/sections`, section) as Observable<Section>
  }

  updateSection (section:Section){
    return this.update(`${BASE_URL}/sections`, section.id, section) as Observable<Section>
  }

  getAllSections() {
    return this.read(`${BASE_URL}/sections`) as Observable<Section[]>
  }

  getSingleSection(id:number) {
    return this.readById(`${BASE_URL}/sections`, id) as Observable<Section>
  }

  //subsections
  createSubSection(subsection: SubSectionInput) {
    return this.create(`${BASE_URL}/subsections`, subsection) as Observable<SubSection>
  }

  updateSubSection (subsection:SubSection){
    return this.update(`${BASE_URL}/subsections`, subsection.id, subsection) as Observable<SubSection>
  }

  getSingleSubsection(id:number) {
    return this.readById(`${BASE_URL}/subsections`, id) as Observable<SubSection>
  }

  getSubSectionsOfaSection(sectionId:number) {
    return this.read(`${BASE_URL}/sections/${sectionId}/subsections`) as Observable<SubSection[]>
  }

  //questions
  createQuestion(question: QuestionInput) {
    return this.create(`${BASE_URL}/questions`, question) as Observable<Question>
  }

  getSingleQuestion(id:number){
    return this.readById(`${BASE_URL}/questions`, id) as Observable<Question>
  }

  updateQuestion(question:Question) {
    return this.update(`${BASE_URL}/questions`, question.id, question) as Observable<Question>
  }

  getQuestionsOfSubSection(subsectionId:number) {
    return this.read(`${BASE_URL}/subsections/${subsectionId}/questions`)  as Observable<Question[]>
  }

  //Answers
  createAnswer(answer:AnswerInput){
    return this.create(`${BASE_URL}/answers`, answer) as Observable<Answer>
  }
  updateAnswer(answer:Answer, questionId:number){
    return this.update(`${BASE_URL}/answers`, answer.id, answer) as Observable<Answer>
  }

  getAnswersOfAQuestion(questionId:number) {
    const answers$ = this.read(`${BASE_URL}/answers`)  as Observable<Answer[]>
    return answers$.pipe(map(res => res.filter(a => a.id === questionId)))
  }



}
