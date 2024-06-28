import { Component } from '@angular/core';
import {LayoutComponent} from "../../../../shared/business/layout/layout.component";
import {IndexLayoutComponent} from "../../../../shared/business/components/index-layout/index-layout.component";
import {LandingComponent} from "../../components/onboarding/landing/landing.component";

@Component({
  selector: 'app-onboarding',
  standalone: true,
  imports: [
    LayoutComponent,
    IndexLayoutComponent,
    LandingComponent
  ],
  templateUrl: './onboarding.component.html',
  styleUrl: './onboarding.component.scss'
})
export class OnboardingComponent {

}
