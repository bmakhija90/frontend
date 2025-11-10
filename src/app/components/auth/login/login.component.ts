import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginDto } from '../../../models/auth.model';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onLogin(): void {
    if (this.loginForm.invalid) {
      console.log('Form is invalid');
      return;
    }
    
    this.isLoading = true;
    this.error = '';
    console.log('Sending login request');
    
    const credentials: LoginDto = this.loginForm.value;
    
    this.authService.login(credentials).subscribe({
      next: (response) => {
        console.log('Login successful, navigating to dashboard');
        this.isLoading = false;
        this.router.navigate(['/dashboard']).then(success => {
          console.log('Navigation success:', success);
        }).catch(err => {
          console.error('Navigation error:', err);
        });
      },
      error: (err) => {
        console.error('Login API error:', err);
        this.error = err.error?.message || err.message || 'Login failed. Please check your credentials.';
        this.isLoading = false;
        this.snackBar.open(this.error, 'Close', { duration: 3000 });
      }
    });
  }
}