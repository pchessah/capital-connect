import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { SharedModule } from '../../../shared';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.scss'
})
export class FeedbackComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { title: string, message: string, type: string }) { }

  getIcon(type: string): string {
    switch(type) {
      case 'info': return 'info';
      case 'success': return 'check_circle';
      case 'warning': return 'warning';
      case 'error': return 'error';
      default: return 'info';
    }
  }
}
