import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {jwtDecode} from 'jwt-decode';
import { Router } from '@angular/router';

interface TokenPayload {
  sub: string;
  exp: number;
  iat: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {
    this.checkToken();
  }

  register(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { email, pwd: password });
  }

  login(email: string, password: string): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/login`, { email, pwd: password })
      .pipe(
        tap((response: any) => {
          localStorage.setItem('token', response.token);
          this.isAuthenticatedSubject.next(true);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  getCurrentUserEmail(): string | null {
    const token = this.getToken();
    if (!token) return null;
    const payload = jwtDecode<TokenPayload>(token);
    return payload.sub;
  }

  private checkToken(): void {
    const token = this.getToken();
    if (token) {
      const payload = jwtDecode<TokenPayload>(token);
      const isExpired = Date.now() >= payload.exp * 1000;
      if (!isExpired) {
        this.isAuthenticatedSubject.next(true);
      } else {
        this.logout();
      }
    }
  }
}
