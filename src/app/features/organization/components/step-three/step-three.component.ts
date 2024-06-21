import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { SharedModule } from '../../../../shared';
import { FeedbackService } from '../../../../core';

@Component({
  selector: 'app-step-three',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './step-three.component.html',
  styleUrl: './step-three.component.scss'
})
export class StepThreeComponent {

  private _feedbackService = inject(FeedbackService);

  displayMsg(){
    this._feedbackService.info("Feature not available yet. Please Contact Admin")
  }



}
