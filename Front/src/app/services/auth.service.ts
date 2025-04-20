import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api'; // Backend URL

  constructor(private http: HttpClient) {}

  login(nom: string, password: string): Observable<boolean> {
    return this.http.post<{ success: boolean, user: any, message?: string }>(`${this.apiUrl}/login`, { nom, password })
      .pipe(
        map(response => {
          if (response.success) {
            localStorage.setItem('currentUser', JSON.stringify(response.user));
            return true;
          }
          throw new Error(response.message || 'Login failed');
        })
      );
  }

  signup(nom: string, password: string): Observable<boolean> {
    return this.http.post<{ success: boolean, user: any, message?: string }>(`${this.apiUrl}/signup`, { nom, password })
      .pipe(
        map(response => {
          if (response.success) {
            localStorage.setItem('currentUser', JSON.stringify(response.user));
            return true;
          }
          throw new Error(response.message || 'Sign-up failed');
        })
      );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  getCurrentUser(): any {
    return JSON.parse(localStorage.getItem('currentUser') || '{}');
  }

  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user.nom === 'LineoL'; // Assuming LineoL is the admin
  }
}