import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';  // Add this import
import { Observable } from 'rxjs';  // For typing HTTP responses
import { map, tap } from 'rxjs/operators';  // Import map and tap operators

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;

  constructor(
    private router: Router,
    private http: HttpClient  // Inject HttpClient here
  ) {}

  // Example login method that makes an HTTP call
  login(credentials: {username: string, password: string}): Observable<any> {
    return this.http.post('/api/auth/login', credentials).pipe(
      // Handle response
      tap(response => {
        this.isAuthenticated = true;
        // You might want to store a token here
      })
    );
  }

  logout() {
    this.isAuthenticated = false;
    // Example: You might want to call a logout API endpoint
    // this.http.post('/api/auth/logout', {}).subscribe();
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  // Example method to verify token with server
  checkAuthStatus(): Observable<boolean> {
    interface AuthStatusResponse {
      authenticated: boolean;
    }

    return this.http.get<AuthStatusResponse>('/api/auth/status').pipe(
      map((response: AuthStatusResponse): boolean => {
        this.isAuthenticated = response.authenticated;
        return this.isAuthenticated;
      })
    );
  }

  redirectToLogin(returnUrl: string) {
    this.router.navigate(['/login'], { queryParams: { returnUrl } });
  }
}