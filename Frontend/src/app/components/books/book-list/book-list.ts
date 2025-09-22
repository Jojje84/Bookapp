import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService, Book } from '../../../services/book';
import { FormsModule } from '@angular/forms';
import { BookFormComponent } from '../book-form/book-form';

declare var bootstrap: any;

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, FormsModule, BookFormComponent],
  templateUrl: './book-list.html',
  styleUrls: ['./book-list.css'],
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  bookToDelete: Book | null = null;
  editingBook: Book = { title: '', author: '', publishedDate: '' }; // 🔹 lägg till denna
  searchText: string = '';
  sortBy: string = 'title';

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks() {
    this.bookService.getBooks().subscribe({
      next: (data) => (this.books = data),
      error: (err) => console.error('Kunde inte hämta böcker', err),
    });
  }

  // 🔹 öppna modal för add/edit
  openBookModal(book?: Book) {
    if (book) {
      this.editingBook = { ...book }; // redigera befintlig
    } else {
      this.editingBook = { title: '', author: '', publishedDate: '' }; // ny bok
    }
  }

  // 🔹 spara bok
  saveBook(book: Book) {
    if (book.id) {
      this.bookService.updateBook(book.id, book).subscribe({
        next: () => {
          this.books = this.books.map((b) => (b.id === book.id ? book : b));
          this.closeBookModal(); // 👈 stäng modal
        },
        error: (err) => console.error('Kunde inte uppdatera bok', err),
      });
    } else {
      this.bookService.addBook(book).subscribe({
        next: (created) => {
          this.books.push(created);
          this.closeBookModal(); // 👈 stäng modal
        },
        error: (err) => console.error('Kunde inte lägga till bok', err),
      });
    }
  }

  closeBookModal() {
    const modalEl = document.getElementById('bookModal');
    if (modalEl) {
      const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
      modal.hide();
    }
  }

  // 🔹 öppna modal för radering
  openDeleteModal(book: Book) {
    this.bookToDelete = book;
  }

  // 🔹 bekräfta radering
  confirmDelete() {
    if (this.bookToDelete) {
      this.bookService.deleteBook(this.bookToDelete.id!).subscribe({
        next: () => {
          this.books = this.books.filter((b) => b.id !== this.bookToDelete?.id);
          this.bookToDelete = null;
        },
        error: (err) => console.error('Kunde inte radera bok', err),
      });
    }
  }

  // 🔹 filtrering + sortering
  get filteredBooks() {
    let filtered = this.books;

    if (this.searchText) {
      filtered = filtered.filter(
        (book) =>
          book.title.toLowerCase().includes(this.searchText.toLowerCase()) ||
          book.author.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }

    switch (this.sortBy) {
      case 'title':
        filtered = filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'author':
        filtered = filtered.sort((a, b) => a.author.localeCompare(b.author));
        break;
      case 'year':
        filtered = filtered.sort(
          (a, b) => new Date(a.publishedDate).getTime() - new Date(b.publishedDate).getTime()
        );
        break;
    }

    return filtered;
  }
}
