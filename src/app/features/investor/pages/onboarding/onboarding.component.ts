import {Component, inject} from '@angular/core';
import {LayoutComponent} from "../../../../shared/business/layout/layout.component";
import {IndexLayoutComponent} from "../../../../shared/business/components/index-layout/index-layout.component";
import {LandingComponent} from "../../components/onboarding/landing/landing.component";
import {InvestorScreensService} from "../../services/investor.screens.service";
import {CommonModule} from "@angular/common";
import {StepsComponent} from "../../components/onboarding/steps/steps.component";
import {FormsLayoutComponent} from "../../../../shared/business/components/forms-layout/forms-layout.component";
import {SuccessScreenComponent} from "../../components/onboarding/success-screen/success-screen.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-onboarding',
  standalone: true,
  imports: [
    LayoutComponent,
    IndexLayoutComponent,
    LandingComponent,
    CommonModule,
    StepsComponent,
    FormsLayoutComponent,
    SuccessScreenComponent
  ],
  templateUrl: './onboarding.component.html',
  styleUrl: './onboarding.component.scss'
})
export class OnboardingComponent {
  private _router =inject(Router)
  private _screenService = inject(InvestorScreensService);
  currentScreen$ =this._screenService.currentScreen$;
  activeRouteData: { data: {page: number, step: number} } = this._router.getCurrentNavigation()?.extras.state as any
  ngOnInit(){
    this._screenService.setCurrentScreen(this.activeRouteData?.data?.page || 1);
    this._screenService.setCurrentStep(this.activeRouteData?.data?.step || 1);
  }
}
