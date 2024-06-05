import { Component, Input } from '@angular/core';
import { ProgressBarComponent } from '../../../../features/business/components/progress-bar/progress-bar.component';
import { BusinessPageService } from '../../../../core/business.page.service';

@Component({
  selector: 'app-forms-layout',
  standalone: true,
  imports: [ProgressBarComponent],
  templateUrl: './forms-layout.component.html',
  styleUrl: './forms-layout.component.scss'
})
export class FormsLayoutComponent {
  current_step =1;
  current_page =1;
  constructor(private businessPageService: BusinessPageService) {}

  @Input() steps: number =3;

  setNextScreen(step: number) {
    this.setNextStep(step);
    if (this.current_step >=this.steps || (this.current_step <1 && step <0)){
      this.current_page +=step;
      this.businessPageService.setCurrentPage(this.current_page);
      
    }
  }

  setNextStep(step =1){
    if ((step <0 && this.current_step <1) || (step >0 && this.current_step >=this.steps)) return;
    this.current_step +=step;
    this.businessPageService.setCurrentStep(this.current_step)

  }
}
