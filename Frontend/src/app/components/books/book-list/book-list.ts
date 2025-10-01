/*
 * Bookapp - Book Management System Frontend
 * Copyright (c) 2025 Jorge Avila
 * Author: Jorge Avila (jorgeavilas@icloud.com)
 * Repository: https://github.com/Jojje84/Bookapp
 * License: MIT License - see LICENSE file for details
 * 
 * This file contains the book list component with CRUD operations.
 * Original work by Jorge Avila - please maintain attribution.
 */

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
  editingBook: Book = { title: '', author: '', publishedDate: '' }; 
  searchText: string = '';
  sortBy: string = 'title';

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks() {
    this.bookService.getBooks().subscribe({
      next: (data) => (this.books = data),
      error: (err) => console.error('Failed to fetch books', err),
    });
  }

  // 🔹 open modal for add/edit
  openBookModal(book?: Book) {
    if (book) {
      this.editingBook = { ...book }; // edit existing
    } else {
      this.editingBook = { title: '', author: '', publishedDate: '' }; // new book
    }
  }

  // 🔹 save book
  saveBook(book: Book) {
    if (book.id) {
      this.bookService.updateBook(book.id, book).subscribe({
        next: () => {
          this.books = this.books.map((b) => (b.id === book.id ? book : b));
          this.closeBookModal();
        },
        error: (err) => console.error('Failed to update book', err),
      });
    } else {
      this.bookService.addBook(book).subscribe({
        next: (created) => {
          this.books.push(created);
          this.closeBookModal(); 
        },
        error: (err) => console.error('Failed to add book', err),
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

  // 🔹 open modal for deletion
  openDeleteModal(book: Book) {
    this.bookToDelete = book;
  }

  // 🔹 confirm deletion
  confirmDelete() {
    if (this.bookToDelete) {
      this.bookService.deleteBook(this.bookToDelete.id!).subscribe({
        next: () => {
          this.books = this.books.filter((b) => b.id !== this.bookToDelete?.id);
          this.bookToDelete = null;
        },
        error: (err) => console.error('Failed to delete book', err),
      });
    }
  }

  // 🔹 filtering + sorting
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
