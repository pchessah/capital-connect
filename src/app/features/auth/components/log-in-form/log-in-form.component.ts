import {Component, EventEmitter, inject, Output} from '@angular/core';
import {AuthModule} from '../../modules/auth.module';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {Router} from "@angular/router";
import {AuthService} from '../../services/auth.service';
import {catchError, EMPTY, Observable, switchMap, tap} from 'rxjs';
import {USER_ROLES} from "../../../../shared";
import {DynamicRoutingService} from "../../../../shared/services/dynamic.routing.service";
import {OrganizationOnboardService} from "../../../organization/services/organization-onboard.service";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-log-in-form',
  standalone: true,
  imports: [CommonModule, AuthModule, FormsModule, ReactiveFormsModule],
  templateUrl: './log-in-form.component.html',
  styleUrl: './log-in-form.component.scss'
})
export class LogInFormComponent {
  @Output() goToForgetPasswordScreenEvent = new EventEmitter();
  private _formBuilder = inject(FormBuilder);
  private _router = inject(Router);
  private _authService = inject(AuthService);
  private _dynamicRoutingService =inject(DynamicRoutingService);
  private _organizationService =inject(OrganizationOnboardService)

  logIn$ = new Observable<unknown>();
  routing$ =new Observable<unknown>();

  signInForm = this._formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  })

  isTouchedOrDirty(formControlName: string) {

    const fieldIsTouched = this.signInForm.get(formControlName)?.touched;
    const fieldIsDirty = this.signInForm.get(formControlName)?.dirty;
    return fieldIsTouched || fieldIsDirty;
  }

  isValid(formControlName: string) {
    return this.signInForm.get(formControlName)?.valid;
  }

  submitCredentials() {
    const credentials = { username: this.signInForm.value.email as string, password: this.signInForm.value.password as string };
    //{role, access_token}
    this.logIn$ = this._authService.login(credentials).pipe(switchMap((profile) => { 
      switch (profile.roles as USER_ROLES) {
        case USER_ROLES.USER:
          return this._organizationService.getCompanyOfUser().pipe(
            switchMap(company =>{
              if(company){
                return this._dynamicRoutingService.testGetUserSubmissions()
              } else {

                //ROUTE TO ORGANIZATION/SETUP
                return EMPTY
              }
            })
          )

        case USER_ROLES.INVESTOR:
          return this._dynamicRoutingService.testGetInvestorSubmission()

        case USER_ROLES.ADMIN:
          this._router.navigateByUrl('/questions');
      }
      return EMPTY;
      }),
      catchError(error =>{
        console.error(error)
        return EMPTY
      }))

  }

  goToForgetPassword(){
    this.goToForgetPasswordScreenEvent.emit()
  }

}
