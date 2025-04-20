
import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Ajoutez ceci

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    CommonModule // Ajoutez ceci
  ]
})
export class LoginComponent {
  nom: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.errorMessage = '';
    this.authService.login(this.nom, this.password).subscribe({
      next: (success) => {
        if (success) {
          this.router.navigate(['/assignments']);
        }
      },
      error: (err) => {
        this.errorMessage = err.message || 'Une erreur est survenue. Veuillez réessayer.';
      }
    });
  }
}