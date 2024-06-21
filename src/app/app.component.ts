import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SharedModule } from './shared';
import { LoadingComponent } from './core/components/loading/loading.component';
import { LoadingService } from './core';
import { tap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SharedModule, LoadingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private _loadingService = inject(LoadingService);
  isLoading = true;

  trackLoadingStatus$ = this._loadingService.loading$.pipe(tap(res => this.isLoading = res))


}
