/*
 * Bookapp - Book Management System Frontend
 * Copyright (c) 2025 Jorge Avila
 * Author: Jorge Avila (jorgeavilas@icloud.com)
 * Repository: https://github.com/Jojje84/Bookapp
 * License: MIT License - see LICENSE file for details
 * 
 * This file contains the book service with CRUD operations.
 * Original work by Jorge Avila - please maintain attribution.
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../app.config'; 
import { Observable } from 'rxjs';

export interface Book {
  id?: number;
  title: string;
  author: string;
  publishedDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private baseUrl = environment.apiUrl;  // 👈 Render-backend

  constructor(private http: HttpClient) {}

  // 📚 Hämta alla böcker
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseUrl}/api/books`);
  }

  // 📖 Hämta en bok
  getBook(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.baseUrl}/api/books/${id}`);
  }

  // ➕ Lägg till en bok
  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(`${this.baseUrl}/api/books`, book);
  }

  // ✏️ Uppdatera en bok
  updateBook(id: number, book: Book): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/api/books/${id}`, book);
  }

  // 🗑️ Ta bort en bok
  deleteBook(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/api/books/${id}`);
  }
}
