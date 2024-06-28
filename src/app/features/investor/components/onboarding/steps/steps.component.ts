import {Component, inject} from '@angular/core';
import {tap} from "rxjs";
import {InvestorScreensService} from "../../../services/investor.screens.service";
import { CommonModule } from "@angular/common";
import {StepOneComponent} from "../step-one/step-one.component";
import {StepTwoComponent} from "../step-two/step-two.component";

@Component({
  selector: 'app-steps',
  standalone: true,
  imports: [
    CommonModule,
    StepOneComponent,
    StepTwoComponent
  ],
  templateUrl: './steps.component.html',
  styleUrl: './steps.component.scss'
})
export class StepsComponent {
  current_step!:number;
  private _screenService =inject(InvestorScreensService);

  currentStep$ = this._screenService.currentStep$.pipe(tap(step => {
    this.current_step = step;
  }))
}
