import { Injectable } from '@angular/core';
import { BASE_URL, BaseHttpService } from '../../../../core';
import { HttpClient } from '@angular/common/http';
import { Question, QuestionInput, Section, SectionInput, SubSection, SubSectionInput } from '../../interfaces';
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
    return this.create(`${BASE_URL}/question`, question) as Observable<Question>
  }

  getSingleSubsection(id:number) {
    return this.readById(`${BASE_URL}/subsections`, id) as Observable<SubSection>
  }

}
