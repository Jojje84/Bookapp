import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent], // 👈 lägg till här
  templateUrl: './app.html', // eller ./app.component.html om du döper om
})
export class AppComponent {
  constructor(public authService: AuthService) {}
}
