import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  nom: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.errorMessage = ''; // Reset error message
    this.authService.login(this.nom, this.password).subscribe({
      next: (success) => {
        if (success) {
          this.router.navigate(['/assignments']);
        }
      },
      error: (err) => {
        this.errorMessage = err.message || 'An error occurred. Please try again.';
      }
    });
  }
}