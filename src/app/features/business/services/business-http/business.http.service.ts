import { inject, Injectable } from '@angular/core';
import { QuestionsService } from '../../../questions/services/questions/questions.service';
import { BehaviorSubject, switchMap } from 'rxjs';
import { BusinessFinancials } from '../../interfaces/business-financials.interface';

@Injectable({ providedIn: 'root' })
export class BusinessHttpService {

  private _questionService = inject(QuestionsService);

  private _bussinessFinacialsStateSrc = new BehaviorSubject<BusinessFinancials>(null as any)


  constructor() { }

  fetchBusinessFinancialsState() {
    const section$ = this._questionService.getSingleSection(5);
    const subsections$ = this._questionService.getSubSectionsOfaSection(5);

    section$.pipe(switchMap(section => {
      let currentVal = this._bussinessFinacialsStateSrc.value;
      currentVal = { ...currentVal, section}
      this._bussinessFinacialsStateSrc.next(currentVal)
      return subsections$
    }), )

  }

}