import { Component, Input } from '@angular/core';
import { BusinessPageService } from '../../../../features/business/services/business-page/business.page.service';
import { ProgressBarComponent } from '../../../../features/business/components/progress-bar/progress-bar.component';

@Component({
  selector: 'app-forms-layout',
  standalone: true,
  imports: [ProgressBarComponent],
  templateUrl: './forms-layout.component.html',
  styleUrl: './forms-layout.component.scss'
})
export class FormsLayoutComponent {
  current_step =1;
  current_page =2;
  constructor(private businessPageService: BusinessPageService) {}

  @Input() steps: number =3;
  @Input() title: string ='';

  setNextScreen(step: number) {
    this.setNextStep(step);
    if (this.current_step >this.steps || (this.current_step <1 && step <0)){
      this.current_step =1;
      this.current_page +=step;
      this.businessPageService.setCurrentStep(this.current_step);
      this.businessPageService.setCurrentPage(this.current_page);
    }
  }

  setNextStep(step =1){
    if ((step <0 && this.current_step <1) || (step >0 && this.current_step >this.steps)) return;
    this.current_step +=step;
    this.businessPageService.setCurrentStep(this.current_step);
  }
}
