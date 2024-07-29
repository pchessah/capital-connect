import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { distinctUntilChanged, tap } from 'rxjs';
import { SharedModule } from './shared';
import { } from './core/components/loading/loading.component';
import { FeedbackNotificationComponent, LoadingService, LoadingComponent } from './core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SharedModule, LoadingComponent, FeedbackNotificationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  private _loadingService = inject(LoadingService);
  private _cd = inject(ChangeDetectorRef);

  loading$ = this._loadingService.loading$.pipe(distinctUntilChanged(), tap(res => {
    this.isLoading = res;
    this._cd.detectChanges();
  }))

  isLoading = true;

}
