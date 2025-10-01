/*
 * Bookapp - Book Management System Frontend
 * Copyright (c) 2025 Jorge Avila
 * Author: Jorge Avila (jorgeavilas@icloud.com)
 * Repository: https://github.com/Jojje84/Bookapp
 * License: MIT License - see LICENSE file for details
 * 
 * This file contains the Angular application configuration.
 * Original work by Jorge Avila - please maintain attribution.
 */

import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { AuthInterceptor } from './services/auth-interceptor';

export const environment = {
  apiUrl: 'https://bookapp-backend-lgwi.onrender.com'
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([AuthInterceptor])
    )
  ]
};
