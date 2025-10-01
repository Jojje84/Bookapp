/*
 * Bookapp - Book Management System Frontend
 * Copyright (c) 2025 Jorge Avila
 * Author: Jorge Avila (jorgeavilas@icloud.com)
 * Repository: https://github.com/Jojje84/Bookapp
 * License: MIT License - see LICENSE file for details
 * 
 * This file contains the book form component for adding/editing books.
 * Original work by Jorge Avila - please maintain attribution.
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Book } from '../../../services/book';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './book-form.html',
  styleUrls: ['./book-form.css']
})
export class BookFormComponent {
  @Input() book: Book = { title: '', author: '', publishedDate: '' };
  @Input() isEdit = false;

  @Output() save = new EventEmitter<Book>();
  @Output() cancel = new EventEmitter<void>();

  onSubmit() {
    this.save.emit(this.book);
  }

  onCancel() {
    this.cancel.emit();
  }
}
