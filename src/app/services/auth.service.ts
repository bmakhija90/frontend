import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { LoginDto, AuthResponse } from '../models/auth.model'; // Updated interface
import { environment } from '../../environments/environment';
import { PlatformService } from './platform.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = `${environment.apiUrl}/api/auth`;
  private authSubject = new BehaviorSubject<boolean>(this.isAuthenticated());
  public authStatus = this.authSubject.asObservable();

  constructor(
    private http: HttpClient,
    private platformService: PlatformService
  ) { }

  login(credentials: LoginDto): Observable<AuthResponse> {
    console.log('Login attempt started');
    
    return this.http.post<AuthResponse>(`${this.authUrl}/login`, credentials, {
      withCredentials: true
    }).pipe(
      tap(response => {
        console.log('Login response received:', response);
        if (response.token) {
          this.platformService.setItem('adminToken', response.token);
          // Optionally store user info
          this.platformService.setItem('userEmail', response.email);
          this.platformService.setItem('userRole', response.role);
          this.authSubject.next(true);
          console.log('Token stored, auth status updated to true');
        } else {
          console.error('No token in response');
        }
      }),
      catchError(error => {
        console.error('Login error:', error);
        throw error;
      })
    );
  }

  logout(): void {
    this.platformService.removeItem('adminToken');
    this.platformService.removeItem('userEmail');
    this.platformService.removeItem('userRole');
    this.authSubject.next(false);
  }

  isAuthenticated(): boolean {
    const isAuthenticated = !!this.platformService.getItem('adminToken');
    console.log('isAuthenticated check:', isAuthenticated);
    return isAuthenticated;
  }

  getToken(): string | null {
    return this.platformService.getItem('adminToken');
  }

  getUserEmail(): string | null {
    return this.platformService.getItem('userEmail');
  }

  getUserRole(): string | null {
    return this.platformService.getItem('userRole');
  }
}