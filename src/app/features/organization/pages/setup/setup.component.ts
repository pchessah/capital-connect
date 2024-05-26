import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { StepOneComponent } from '../../components/step-one/step-one.component';
import { StepTwoComponent } from '../../components/step-two/step-two.component';
import { StepThreeComponent } from '../../components/step-three/step-three.component';
import { StepFourComponent } from '../../components/step-four/step-four.component';

@Component({
  selector: 'app-setup',
  standalone: true,
  imports: [CommonModule, StepOneComponent, StepTwoComponent, StepThreeComponent, StepFourComponent],
  templateUrl: './setup.component.html',
  styleUrl: './setup.component.scss'
})
export class SetupComponent {
  current_step =0;
  steps =[1, 2, 3, 4];

  setStep(direction:number){
    if(direction >0 && (this.current_step >=this.steps.length -1)) return;
    if(direction <0 && (this.current_step <=0)) return;
    this.current_step +=direction;
  }
}
