import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BookService, Book } from '../../../services/book';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-list.html',
  styleUrls: ['./book-list.css'],
})
export class BookListComponent implements OnInit {
  books: Book[] = [];

  constructor(private bookService: BookService, private router: Router) {}

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks() {
    this.bookService.getBooks().subscribe({
      next: (data) => (this.books = data),
      error: (err) => console.error('Kunde inte hämta böcker', err),
    });
  }

  addBook() {
    this.router.navigate(['/books/add']);
  }

  editBook(id: number) {
    this.router.navigate(['/books/edit', id]);
  }

  deleteBook(id: number) {
    this.bookService.deleteBook(id).subscribe({
      next: () => (this.books = this.books.filter((b) => b.id !== id)),
      error: (err) => console.error(err),
    });
  }
}
