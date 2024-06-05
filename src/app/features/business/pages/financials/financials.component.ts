import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepsComponent } from '../../components/steps/steps.component';
import { IndexComponent } from '../../components/index/index.component';
import { BusinessPageService } from '../../../../core/business.page.service';
import { LayoutComponent } from '../../../../shared/business/layout/layout.component';
import { SuccessScreenComponent } from '../../components/success-screen/success-screen.component';
import { IndexLayoutComponent } from '../../../../shared/business/components/index-layout/index-layout.component';
import { FormsLayoutComponent } from '../../../../shared/business/components/forms-layout/forms-layout.component';

@Component({
  standalone: true,
  selector: 'app-financials',
  styleUrl: './financials.component.scss',
  templateUrl: './financials.component.html',
  imports: [CommonModule, LayoutComponent, IndexLayoutComponent, FormsLayoutComponent, IndexComponent, StepsComponent, SuccessScreenComponent],
})

export class FinancialsComponent {
  current_screen: number =1;

  constructor(private screenService: BusinessPageService) {
    this.screenService.current_page$.subscribe(screen => {
      this.current_screen = screen;
    });
  }
}
