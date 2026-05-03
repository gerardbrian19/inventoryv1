import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private router = inject(Router);

  username = '';
  password = '';
  role = 'User';
  hidePassword = true;
  errorMessage = '';

  roles = ['User', 'Admin'];

  login(): void {
    if (!this.username.trim() || !this.password.trim()) {
      this.errorMessage = 'Please fill in all fields.';
      return;
    }
    this.errorMessage = '';
    this.router.navigate(['/home']);
  }
}
