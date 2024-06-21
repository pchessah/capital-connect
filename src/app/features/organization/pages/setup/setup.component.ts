import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { StepOneComponent } from '../../components/step-one/step-one.component';
import { StepTwoComponent } from '../../components/step-two/step-two.component';
import { StepThreeComponent } from '../../components/step-three/step-three.component';
import { StepFourComponent } from '../../components/step-four/step-four.component';
import { OrganizationOnboardService } from '../../services/organization-onboard.service';
import { catchError, EMPTY, Observable, tap } from 'rxjs';

@Component({
  selector: 'app-setup',
  standalone: true,
  imports: [CommonModule, StepOneComponent, StepTwoComponent, StepThreeComponent, StepFourComponent],
  templateUrl: './setup.component.html',
  styleUrl: './setup.component.scss'
})
export class SetupComponent {
   _organizationOnboardService = inject(OrganizationOnboardService);
   submitCompanyInfo$ = new Observable();

  current_step = 1;
  steps = [1, 2, 3, 4];

  setStep(direction: number) {
    if (direction > 0 && (this.current_step >= this.steps.length)) return;
    if (direction < 0 && (this.current_step <= 1)) return;

    if(this.current_step === 3) {
      this.submitCompanyInfo$ = this._organizationOnboardService.submitCompanyInfo().pipe(tap(res =>  this.current_step += direction), catchError(err => {
        console.error('⚠️There was an error:', err)
        return EMPTY
      }))
    } else {
      this.current_step += direction;
    }
  }

  get isDisabled(){
    if(this.current_step === 1) return !this._organizationOnboardService.step1isValid();
    if(this.current_step === 2) return !this._organizationOnboardService.step2isValid();
    if(this.current_step === 3) return false //TODO: @pchessahadd condition to check if upload of logo is successful
    return true;
  }
}
