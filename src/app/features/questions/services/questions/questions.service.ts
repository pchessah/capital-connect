import { Injectable } from '@angular/core';
import { BASE_URL, BaseHttpService } from '../../../../core';
import { HttpClient } from '@angular/common/http';
import { Answer, AnswerInput, Question, QuestionInput, Section, SectionInput, SubSection, SubSectionInput } from '../../interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService extends BaseHttpService {


  constructor(private _httpClient: HttpClient) {
    super(_httpClient)
  }

  createSection(section: SectionInput) {
    return this.create(`${BASE_URL}/sections`, section) as Observable<Section>
  }

  createSubSection(subsection: SubSectionInput) {
    return this.create(`${BASE_URL}/subsections`, subsection) as Observable<SubSection>
  }

  createQuestion(question: QuestionInput) {
    return this.create(`${BASE_URL}/questions`, question) as Observable<Question>
  }

  getSingleSubsection(id:number) {
    return this.readById(`${BASE_URL}/subsections`, id) as Observable<SubSection>
  }

  createAnswer(answer:AnswerInput){
    return this.create(`${BASE_URL}/answers`, answer) as Observable<Answer>
  }

  getSingleQuestion(id:number){
    return this.readById(`${BASE_URL}/questions`, id) as Observable<Question>
  }

}
