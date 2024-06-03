import { Component } from '@angular/core';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';

@Component({
  selector: 'app-success-screen',
  standalone: true,
  imports: [ProgressBarComponent],
  templateUrl: './success-screen.component.html',
  styleUrl: './success-screen.component.scss'
})
export class SuccessScreenComponent {

}
