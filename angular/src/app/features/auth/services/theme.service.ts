// theme.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  isDarkMode: boolean = false;

  constructor() {}

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
  }
}
