import { Injectable, OnDestroy } from '@angular/core';
import { signal } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BaseHttpService } from '../../http/base/base.http.service';

@Injectable({
  providedIn: 'root'
})
export class StateService<T> implements OnDestroy {
  private items = signal<T[]>([]);
  private destroy$ = new Subject<void>();

  constructor(private _httpService: BaseHttpService<T>) {}

  // Create a new item
  create(url: string, item: T): void {
    this._httpService.create(url, item)
      .pipe(takeUntil(this.destroy$))
      .subscribe(newItem => {
        this.items.set([...this.items(), newItem]);
      });
  }

  // Read all items
  read(url: string): void {
    this._httpService.read(url)
      .pipe(takeUntil(this.destroy$))
      .subscribe(items => {
        this.items.set(items);
      });
  }

  // Update an item
  update(url: string, id: number, updatedItem: T): void {
    this._httpService.update(url, id, updatedItem)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        const currentItems = this.items();
        const index = currentItems.findIndex(item => (item as any).id === id);
        if (index !== -1) {
          const newItems = [...currentItems];
          newItems[index] = updatedItem;
          this.items.set(newItems);
        }
      });
  }

  // Delete an item
  delete(url: string, id: number): void {
    this._httpService.delete(url, id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        const currentItems = this.items();
        const newItems = currentItems.filter(item => (item as any).id !== id);
        this.items.set(newItems);
      });
  }

  // Get the current items
  getItems(): T[] {
    return this.items();
  }

  // Clean up subscriptions when the service is destroyed
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
