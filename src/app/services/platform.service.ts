import { Injectable } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {
  private isBrowser: boolean;

  constructor() {
    // Check if we're in browser environment
    this.isBrowser = typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  isPlatformBrowser(): boolean {
    return this.isBrowser;
  }

  getItem(key: string): string | null {
    if (this.isBrowser) {
      return localStorage.getItem(key);
    }
    return null;
  }

  setItem(key: string, value: string): void {
    if (this.isBrowser) {
      localStorage.setItem(key, value);
    }
  }

  removeItem(key: string): void {
    if (this.isBrowser) {
      localStorage.removeItem(key);
    }
  }
}