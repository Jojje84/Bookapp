/*
 * Bookapp - Book Management System Frontend
 * Copyright (c) 2025 Jorge Avila
 * Author: Jorge Avila (jorgeavilas@icloud.com)
 * Repository: https://github.com/Jojje84/Bookapp
 * License: MIT License - see LICENSE file for details
 * 
 * This file contains the authentication guard for protected routes.
 * Original work by Jorge Avila - please maintain attribution.
 */

import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true; // släpp igenom
  } else {
    router.navigate(['/login']); // blockera och redirecta
    return false;
  }
};
