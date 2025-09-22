import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BookService } from '../../services/book';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class LoginComponent {
  credentials = { username: '', password: '' };
  token: string | null = null; // 👈 lagra token här

  errorMessage: string | null = null;
  showRedirectMsg: boolean | undefined;

  constructor(private bookService: BookService, private router: Router) {}

  login() {
    this.bookService.login(this.credentials).subscribe({
      next: (res: any) => {
        this.errorMessage = null;

        // ✅ Spara token i localStorage
        localStorage.setItem('jwt', res.token);

        // 🔥 Automatisk utloggning efter 30 minuter
        setTimeout(() => {
          localStorage.removeItem('jwt');
          this.router.navigate(['/login']); // 👈 bättre än '/'
          console.log('Token expired – utloggad automatiskt');
        }, 30 * 60 * 1000);

        // Visa ev. redirect-meddelande
        this.showRedirectMsg = true;

        // ✅ Navigera vidare direkt till appen
        this.router.navigate(['/books']);
      },
      error: () => {
        this.showRedirectMsg = false;
        this.errorMessage = 'Fel användarnamn eller lösenord';
      },
    });
  }
}
