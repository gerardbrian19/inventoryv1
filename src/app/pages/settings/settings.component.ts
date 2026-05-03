import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    FormsModule,
    MatCardModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  private snackBar: MatSnackBar;
  constructor(snackBar: MatSnackBar) {
    this.snackBar = snackBar;
  }

  notifications = signal(true);
  emailAlerts = signal(true);
  orderUpdates = signal(true);
  marketingEmails = signal(false);
  smsAlerts = signal(false);

  defaultRole = 'User';
  timezone = 'America/New_York';
  language = 'English';
  currency = 'USD';

  roles = ['User', 'Admin'];
  timezones = ['America/New_York', 'America/Chicago', 'America/Los_Angeles', 'Europe/London', 'Asia/Manila'];
  languages = ['English', 'Spanish', 'French', 'German', 'Filipino'];
  currencies = ['USD', 'EUR', 'GBP', 'PHP', 'JPY'];

  saveSettings(): void {
    this.snackBar.open('Settings saved successfully!', 'Close', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: 'snack-success'
    });
  }
}
