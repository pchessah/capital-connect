import { inject, Injectable } from '@angular/core';
import { BASE_URL, BaseHttpService, FeedbackService } from '../../../../core';
import { HttpClient } from '@angular/common/http';
import { Section, SectionInput, SubSection, SubSectionInput } from '../../interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService extends BaseHttpService {
  private _feedBackService = inject(FeedbackService)

  constructor(private _httpClient: HttpClient) {
    super(_httpClient)
  }

  createSection(section: SectionInput) {
    return this.create(`${BASE_URL}/sections`, section) as Observable<Section>
  }

  createSubSection(subsection: SubSectionInput) {
    return this.create(`${BASE_URL}/subsections`, subsection) as Observable<SubSection>
  }

}
