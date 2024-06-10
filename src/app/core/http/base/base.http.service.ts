import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BaseHttpService {
  constructor(private _http: HttpClient) { }

  // Create a new item
  create(url: string, item: unknown): Observable<unknown> {
    return this._http.post<unknown>(url, item).pipe(
      catchError(this.handleError)
    );
  }

  // Read all items
  read(url: string): Observable<unknown[]> {
    return this._http.get<unknown[]>(url).pipe(
      catchError(this.handleError)
    );
  }

  // Read a single item by ID
  readById(url: string, id: number): Observable<unknown> {
    return this._http.get<unknown>(`${url}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Update an item
  update(url: string, id: number, updatedItem: unknown): Observable<unknown> {
    return this._http.put<unknown>(`${url}/${id}`, updatedItem).pipe(
      catchError(this.handleError)
    );
  }

  // Delete an item
  delete(url: string, id: number): Observable<void> {
    return this._http.delete<void>(`${url}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Handle HTTP error
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Backend error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    const err = new Error(errorMessage);
    return throwError(() => err);
  }
}
