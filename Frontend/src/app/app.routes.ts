/*
 * Bookapp - Book Management System Frontend
 * Copyright (c) 2025 Jorge Avila
 * Author: Jorge Avila (jorgeavilas@icloud.com)
 * Repository: https://github.com/Jojje84/Bookapp
 * License: MIT License - see LICENSE file for details
 * 
 * This file contains the Angular application routing configuration.
 * Original work by Jorge Avila - please maintain attribution.
 */

import { Routes } from '@angular/router';
import { BookListComponent } from './components/books/book-list/book-list';
import { BookFormComponent } from './components/books/book-form/book-form';
import { QuotesComponent } from './components/quotes/quotes';
import { LoginComponent } from './components/login/login';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'books', component: BookListComponent, canActivate: [authGuard] },
  { path: 'books/add', component: BookFormComponent, canActivate: [authGuard] },
  { path: 'books/edit/:id', component: BookFormComponent, canActivate: [authGuard] },
  { path: 'quotes', component: QuotesComponent, canActivate: [authGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];