import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BusinessPageService {
  private currentPageSource = new BehaviorSubject<number>(3);
  private currentStepSource = new BehaviorSubject<number>(1);
  current_page$ = this.currentPageSource.asObservable();
  current_step$ = this.currentStepSource.asObservable();

  setCurrentPage(page: number) {
    this.currentPageSource.next(page);
  }

  setCurrentStep(step: number) {
    this.currentStepSource.next(step);
  }
}
