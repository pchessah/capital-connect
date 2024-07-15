import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { FeedbackService } from '../../services/feedback/feedback.service';
import { SharedModule } from '../../../shared';

@Component({
  selector: 'app-feedback-notification',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './feedback-notification.component.html',
  styleUrl: './feedback-notification.component.scss'
})
export class FeedbackNotificationComponent {
  message: { title: string, message: string, type: 'info' | 'success' | 'warning' | 'error' } | null = null;
  subscription!: Subscription;

  constructor(private feedbackService: FeedbackService) {}

  ngOnInit() {
    this.subscription = this.feedbackService.message$.subscribe(message => {
      this.message = message;
    });
  }

  getIcon(type: string): string {
    switch(type) {
      case 'info': return 'info';
      case 'success': return 'check_circle';
      case 'warning': return 'warning';
      case 'error': return 'error';
      default: return 'info';
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
