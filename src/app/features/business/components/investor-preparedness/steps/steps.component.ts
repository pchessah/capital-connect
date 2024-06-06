import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepOneComponent } from '../step-one/step-one.component';
import { StepTwoComponent } from '../step-two/step-two.component';
import { BusinessPageService } from '../../../../../core/business.page.service';
import { ProgressBarComponent } from '../../progress-bar/progress-bar.component';
import { tap } from 'rxjs';

@Component({
  selector: 'app-steps',
  standalone: true,
  styleUrl: './steps.component.scss',
  templateUrl: './steps.component.html',
  imports: [CommonModule, ProgressBarComponent, StepOneComponent, StepTwoComponent],
})
export class StepsComponent {
  current_step =1;
  constructor(private businessPageService: BusinessPageService) {}
 
  currentStep$ = this.businessPageService.current_step$.pipe(tap(step => {
    this.current_step = step;
  }))
}
