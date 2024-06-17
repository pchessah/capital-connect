import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  // Method to save an object in sessionStorage
  setObject(key: string, value: any): void {
    const jsonValue = JSON.stringify(value);
    sessionStorage.setItem(key, jsonValue);
  }

  // Method to retrieve an object from sessionStorage
  getObject<T>(key: string): T | null {
    const jsonValue = sessionStorage.getItem(key);
    if (jsonValue) {
      return JSON.parse(jsonValue) as T;
    }
    return null;
  }

  // Method to remove an object from sessionStorage
  removeObject(key: string): void {
    sessionStorage.removeItem(key);
  }

  // Method to clear all sessionStorage
  clear(): void {
    sessionStorage.clear();
  }
}
