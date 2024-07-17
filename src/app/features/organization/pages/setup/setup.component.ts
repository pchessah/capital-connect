import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { catchError, EMPTY, filter, Observable, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
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
export class SetupComponent implements OnInit {
  ngOnInit(): void {
    this._initCompanyEditMode();
  }

  private _organizationOnboardService = inject(OrganizationOnboardService);
  private _router = inject(Router);
  private _activateRoute = inject(ActivatedRoute);

  isEditMode = !!this._activateRoute.snapshot.paramMap.get('id')?.length;
  editId = this._activateRoute.snapshot.paramMap.get('id')

  submitCompanyInfo$ = new Observable();

  companyToBeEdited$ = new Observable();

  companyOfUser$ = this._organizationOnboardService.getCompanyOfUser().pipe(filter(() => !this.isEditMode),tap(company => {
    if(company && company.id){
      this.goToBusinessFinancials();
    }
  }));

  private _initCompanyEditMode() {
    if(this.editId) {
      this.companyToBeEdited$ = this._organizationOnboardService.getCompanyToBeEdited(Number(this.editId))

    }
  }


  current_step = 1;
  steps = [1, 2, 3, 4];

  setStep(direction: number) {
    if (direction > 0 && (this.current_step >= this.steps.length)) return;
    if (direction < 0 && (this.current_step <= 1)) return;

    if (this.current_step === 3) {
      this.submitCompanyInfo$ = this._organizationOnboardService.submitCompanyInfo().pipe(tap(res => {
        this.companyOfUser$ = this._organizationOnboardService.getCompanyOfUser()
        this.current_step += direction
      }), catchError(err => {
        console.error('There was an error:', err)
        return EMPTY
      }))
    } else {
      this.current_step += direction;
    }
  }

  get isDisabled() {
    if (this.current_step === 1) return !this._organizationOnboardService.step1isValid();
    if (this.current_step === 2) return !this._organizationOnboardService.step2isValid();
    if (this.current_step === 3) return false //TODO: @pchessah add condition to check if upload of logo is successful
    return true;
  }


  goToBusinessFinancials() {
    this._router.navigateByUrl('/business/financials')
  }
  goToDashBoard() {
    this._router.navigateByUrl('/business')
  }
}
