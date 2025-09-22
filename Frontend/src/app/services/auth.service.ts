import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Kolla om token finns
  isLoggedIn(): boolean {
    return !!localStorage.getItem('jwt');
  }

  // Hämta token (om du behöver i interceptor)
  getToken(): string | null {
    return localStorage.getItem('jwt');
  }

  // Logga ut
  logout(): void {
    localStorage.removeItem('jwt');
  }
}
