import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Book {
  id: number;
  title: string;
  author: string;
  publishedDate: string;
}

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = 'http://localhost:5191/api/books';

  constructor(private http: HttpClient) {}

  // 🔑 LOGIN
  login(credentials: { username: string; password: string }): Observable<{ token: string }> {
    const authUrl = this.apiUrl.replace('/books', '') + '/auth/login';
    return this.http.post<{ token: string }>(authUrl, credentials);
  }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
  }

  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.apiUrl, book).pipe(catchError(this.handleError));
  }

  updateBook(book: Book): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${book.id}`, book).pipe(catchError(this.handleError));
  }

  deleteBook(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 400 && error.error) {
      return throwError(() => error.error);
    }
    return throwError(() => 'Ett okänt fel inträffade');
  }
}