import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { StepOneComponent } from '../../components/step-one/step-one.component';
import { StepTwoComponent } from '../../components/step-two/step-two.component';
import { StepThreeComponent } from '../../components/step-three/step-three.component';
import { StepFourComponent } from '../../components/step-four/step-four.component';
import { OrganizationOnboardService } from '../../services/organization-onboard.service';

@Component({
  selector: 'app-setup',
  standalone: true,
  imports: [CommonModule, StepOneComponent, StepTwoComponent, StepThreeComponent, StepFourComponent],
  templateUrl: './setup.component.html',
  styleUrl: './setup.component.scss'
})
export class SetupComponent {
   _organizationOnboardService = inject(OrganizationOnboardService);

  current_step = 0;
  steps = [1, 2, 3, 4];

  setStep(direction: number) {
    if (direction > 0 && (this.current_step >= this.steps.length - 1)) return;
    if (direction < 0 && (this.current_step <= 0)) return;
    this.current_step += direction;
  }

  get isDisabled(){
    if(this.current_step === 0) return !this._organizationOnboardService.step1isValid();
    if(this.current_step === 1) return !this._organizationOnboardService.step2isValid();
    return true;
  }
}
