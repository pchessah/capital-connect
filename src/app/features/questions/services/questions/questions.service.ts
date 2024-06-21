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

  getAllSections() {
    return this.read(`${BASE_URL}/sections`) as Observable<Section[]>
  }

  //subsections
  createSubSection(subsection: SubSectionInput) {
    return this.create(`${BASE_URL}/subsections`, subsection) as Observable<SubSection>
  }

  getSingleSubsection(id:number) {
    return this.readById(`${BASE_URL}/subsections`, id) as Observable<SubSection>
  }

  getSubSectionsOfaSection(sectionId:number) {
    const subsections$ =  this.read(`${BASE_URL}/subsections`) as Observable<SubSection[]>
    return subsections$.pipe(map(subsections => subsections.filter(s => s.section.id === sectionId)))
  }


  //questions
  createQuestion(question: QuestionInput) {
    return this.create(`${BASE_URL}/questions`, question) as Observable<Question>
  }

  getSingleQuestion(id:number){
    return this.readById(`${BASE_URL}/questions`, id) as Observable<Question>
  }

  getQuestionsOfSubSection(subsectionId:number) {
    const questions$  = this.read(`${BASE_URL}/questions`)  as Observable<Question[]>
    return questions$.pipe(map(questions => questions.filter(q => q.subSection.id = subsectionId)))
  }

  //Answers
  createAnswer(answer:AnswerInput){
    return this.create(`${BASE_URL}/answers`, answer) as Observable<Answer>
  }

  getAnswersOfAQuestion(questionId:number) {
    const answers$ = this.read(`${BASE_URL}/answers`)  as Observable<Answer[]>
    return answers$.pipe(map(res => res.filter(a => a.id === questionId)))
  }



}
