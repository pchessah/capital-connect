import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
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
export class AppComponent implements OnInit, OnDestroy {

  private _loadingService = inject(LoadingService);
  private _cd = inject(ChangeDetectorRef);
  
  isLoading = true;

  ngOnInit(): void {
    this._trackLoadingStatusSubscription();
  }

  private _trackLoadingStatusSubscription = () => this._loadingService.loading$.subscribe(res => {
    this.isLoading = res;
    this._cd.detectChanges();
  })

  ngOnDestroy(): void {
    this._trackLoadingStatusSubscription().unsubscribe()
  }




}
