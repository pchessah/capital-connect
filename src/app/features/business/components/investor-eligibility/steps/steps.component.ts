import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessPageService } from '../../../../../core/business.page.service';
import { ProgressBarComponent } from '../../progress-bar/progress-bar.component';
import { StepOneComponent } from '../step-one/step-one.component';
import { StepTwoComponent } from '../step-two/step-two.component';
import { StepThreeComponent } from '../step-three/step-three.component';

@Component({
  selector: 'app-steps',
  standalone: true,
  styleUrl: './steps.component.scss',
  templateUrl: './steps.component.html',
  imports: [CommonModule, ProgressBarComponent, StepOneComponent, StepTwoComponent, StepThreeComponent],
})
export class StepsComponent {
  current_step =1;
  constructor(private businessPageService: BusinessPageService) {}

  ngOnInit() {
    this.businessPageService.current_step$.subscribe(step => {
      this.current_step = step;
    });
  }
}
