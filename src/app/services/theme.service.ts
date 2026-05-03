import { Injectable, signal, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private doc = inject(DOCUMENT);
  readonly isDark = signal(false);

  constructor() {
    const stored = this.doc.defaultView?.localStorage.getItem('theme');
    const prefersDark = this.doc.defaultView?.matchMedia('(prefers-color-scheme: dark)').matches ?? false;
    const dark = stored ? stored === 'dark' : prefersDark;
    this.isDark.set(dark);
    this.applyTheme(dark);
  }

  toggle(): void {
    const next = !this.isDark();
    this.isDark.set(next);
    this.doc.defaultView?.localStorage.setItem('theme', next ? 'dark' : 'light');
    this.applyTheme(next);
  }

  private applyTheme(dark: boolean): void {
    this.doc.documentElement.classList.toggle('dark', dark);
  }
}
