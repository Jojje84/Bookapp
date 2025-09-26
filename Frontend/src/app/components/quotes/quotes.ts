import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar';

@Component({
  selector: 'app-quotes',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './quotes.html',
  styleUrls: ['./quotes.css']
})
export class QuotesComponent {
  quotes = [
    { text: 'The only limit to our realization of tomorrow is our doubts of today.', author: 'Franklin D. Roosevelt' },
    { text: 'Simplicity is the soul of efficiency.', author: 'Austin Freeman' },
    { text: 'Code is like humor. When you have to explain it, it’s bad.', author: 'Cory House' },
    { text: 'Programs must be written for people to read.', author: 'Harold Abelson' },
    { text: 'Stay hungry, stay foolish.', author: 'Steve Jobs' }
  ];
}
