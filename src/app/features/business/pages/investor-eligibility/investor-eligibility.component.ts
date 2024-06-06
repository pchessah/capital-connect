import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessPageService } from '../../../../core/business.page.service';
import { LayoutComponent } from '../../../../shared/business/layout/layout.component';
import { IndexComponent } from '../../components/investor-eligibility/index/index.component';
import { StepsComponent } from '../../components/investor-eligibility/steps/steps.component';
import { IndexLayoutComponent } from '../../../../shared/business/components/index-layout/index-layout.component';
import { FormsLayoutComponent } from '../../../../shared/business/components/forms-layout/forms-layout.component';
import { SuccessScreenComponent } from '../../components/investor-eligibility/success-screen/success-screen.component';
import { tap } from 'rxjs';

@Component({
  selector: 'app-investor-eligibility',
  standalone: true,
  imports: [CommonModule, LayoutComponent, IndexLayoutComponent, FormsLayoutComponent, IndexComponent, StepsComponent,SuccessScreenComponent],
  templateUrl: './investor-eligibility.component.html',
  styleUrl: './investor-eligibility.component.scss'
})
export class InvestorEligibilityComponent {
  current_screen: number =1;

  constructor(private screenService: BusinessPageService) {}
  currentStep$ = this.screenService.current_step$.pipe(tap(step => {
    this.current_screen = step;
  }))
}
