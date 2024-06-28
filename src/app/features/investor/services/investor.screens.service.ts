import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

@Injectable(
  {
    providedIn: 'root'
  }
)

export class InvestorScreensService {
  private _currentScreenSRC =new BehaviorSubject<number>(2)
  private _currentStepSRC =new BehaviorSubject<number>(1);

  currentScreen$ =this._currentScreenSRC.asObservable();
  currentStep$ =this._currentStepSRC.asObservable();

  setCurrentScreen(screen: number) {
    this._currentScreenSRC.next(screen);
  }

  setCurrentStep(step: number){
    this._currentStepSRC.next(step);
  }
}
