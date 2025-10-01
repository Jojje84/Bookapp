/*
 * Bookapp - Book Management System Frontend
 * Copyright (c) 2025 Jorge Avila
 * Author: Jorge Avila (jorgeavilas@icloud.com)
 * Repository: https://github.com/Jojje84/Bookapp
 * License: MIT License - see LICENSE file for details
 * 
 * This file contains the authentication service with JWT handling.
 * Original work by Jorge Avila - please maintain attribution.
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../app.config';  // 👈 Importera din backend-URL
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.apiUrl;  // 👈 Render-backend

  constructor(private http: HttpClient) {}

  // 🔑 Login mot backend
  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/auth/login`, credentials);
  }

  // ✅ Kolla om token finns
  isLoggedIn(): boolean {
    return !!localStorage.getItem('jwt');
  }

  // 🔑 Hämta token (används av interceptor)
  getToken(): string | null {
    return localStorage.getItem('jwt');
  }

  // 🚪 Logga ut
  logout(): void {
    localStorage.removeItem('jwt');
  }
}
