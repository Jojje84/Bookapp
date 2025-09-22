import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quotes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quotes.html',
  styleUrls: ['./quotes.css'],
})
export class QuotesComponent {
  quotes: string[] = [
    'Kod är som humor. När du måste förklara den, är den dålig.',
    'En bra programmerare letar alltid efter den lataste lösningen.',
    'Programmering handlar om att tänka, inte att skriva kod.',
    'Testa tidigt, testa ofta.',
    'En bugg är bara en oavsiktlig feature. 😉',
  ];
}
