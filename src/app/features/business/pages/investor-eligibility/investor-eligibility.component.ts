import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from '../../components/index/index.component';
import { StepsComponent } from '../../components/steps/steps.component';
import { LayoutComponent } from '../../../../shared/business/layout/layout.component';
import { SuccessScreenComponent } from '../../components/success-screen/success-screen.component';
import { IndexLayoutComponent } from '../../../../shared/business/components/index-layout/index-layout.component';
import { FormsLayoutComponent } from '../../../../shared/business/components/forms-layout/forms-layout.component';
import { BusinessPageService } from '../../../../core/business.page.service';

@Component({
  selector: 'app-investor-eligibility',
  standalone: true,
  imports: [CommonModule, LayoutComponent, IndexLayoutComponent, FormsLayoutComponent, IndexComponent, StepsComponent, SuccessScreenComponent],
  templateUrl: './investor-eligibility.component.html',
  styleUrl: './investor-eligibility.component.scss'
})
export class InvestorEligibilityComponent {
  current_screen: number =1;

  constructor(private screenService: BusinessPageService) {
    this.screenService.current_page$.subscribe(screen => {
      this.current_screen = screen;
    });
  }
}
