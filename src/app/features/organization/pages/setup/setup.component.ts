import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { StepOneComponent } from '../../components/step-one/step-one.component';
import { StepTwoComponent } from '../../components/step-two/step-two.component';
import { StepThreeComponent } from '../../components/step-three/step-three.component';
import { StepFourComponent } from '../../components/step-four/step-four.component';
import { OrganizationOnboardService } from '../../services/organization-onboard.service';
import { catchError, EMPTY, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import {UserCompanyService} from "../../../../core/services/company/user.company.service";

@Component({
  selector: 'app-setup',
  standalone: true,
  imports: [CommonModule, StepOneComponent, StepTwoComponent, StepThreeComponent, StepFourComponent],
  templateUrl: './setup.component.html',
  styleUrl: './setup.component.scss'
})
export class SetupComponent {

  private _userCompany =inject(UserCompanyService)
   private _organizationOnboardService = inject(OrganizationOnboardService);
   private _router = inject(Router);
   companyAlreadyRegistered = false;
   submitCompanyInfo$ = new Observable();
   companyOfUser$ = this._organizationOnboardService.getCompanyOfUser().pipe(tap(company => {
    // this._userCompany.setCompany(company);
    // this.companyAlreadyRegistered =Object.keys(company).length >0;
     this.goToDashBoard();
   }))

  current_step = 1;
  steps = [1, 2, 3, 4];

  setStep(direction: number) {
    if (direction > 0 && (this.current_step >= this.steps.length)) return;
    if (direction < 0 && (this.current_step <= 1)) return;

    if(this.current_step === 3) {
      this.submitCompanyInfo$ = this._organizationOnboardService.submitCompanyInfo().pipe(tap(res =>  this.current_step += direction), catchError(err => {
        console.error('There was an error:', err)
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

  goToBusinessFinancials(){
    this._router.navigateByUrl('/business/financials')
  }
  goToDashBoard(){
    this._router.navigateByUrl('/business')
  }
}
