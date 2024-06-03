import { Component, EventEmitter, Output } from '@angular/core';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import { StepOneComponent } from '../step-one/step-one.component';
import { StepTwoComponent } from '../step-two/step-two.component';
import { StepThreeComponent } from '../step-three/step-three.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-steps',
  standalone: true,
  styleUrl: './steps.component.scss',
  templateUrl: './steps.component.html',
  imports: [CommonModule, ProgressBarComponent, StepOneComponent, StepTwoComponent, StepThreeComponent],
})
export class StepsComponent {
  steps =3;
  current_step =1;
  

  @Output() nextStep = new EventEmitter<number>();

  setNextScreen(step: number) {
    this.setNextStep(step);
    if (this.current_step >this.steps || (this.current_step <1 && step <0)) this.nextStep.emit(step);
  }

  setNextStep(step =1){
    if ((step <0 && this.current_step <1) || (step >0 && this.current_step >this.steps)) return;
    this.current_step +=step;

  }
}
