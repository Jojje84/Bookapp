import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class LoginComponent {
  credentials = { username: '', password: '' };
  token: string | null = null;
  errorMessage: string | null = null;
  showRedirectMsg: boolean | undefined;

  constructor(private authService: AuthService, private router: Router) {}  

  login() {
    this.authService.login(this.credentials).subscribe({
      next: (res: any) => {
        this.errorMessage = null;

        // Save token in localStorage
        localStorage.setItem('jwt', res.token);

        // Automatic logout after 30 minutes
        setTimeout(() => {
          localStorage.removeItem('jwt');
          this.router.navigate(['/login']);
          console.log('Token expired – logged out automatically');
        }, 30 * 60 * 1000);

        // Show redirect message if needed
        this.showRedirectMsg = true;

        // Navigate to books
        this.router.navigate(['/books']);
      },
      error: () => {
        this.showRedirectMsg = false;
        this.errorMessage = 'Invalid username or password';
      },
    });
  }
}
