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


  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      console.log(file);
      // You can now handle the file upload process here
    }
  }

  editLogo(): void {
    // Your edit logo logic here
  }



}
