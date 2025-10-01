/*
 * Bookapp - Book Management System Frontend
 * Copyright (c) 2025 Jorge Avila
 * Author: Jorge Avila (jorgeavilas@icloud.com)
 * Repository: https://github.com/Jojje84/Bookapp
 * License: MIT License - see LICENSE file for details
 * 
 * This file contains the main application bootstrap.
 * Original work by Jorge Avila - please maintain attribution.
 */

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app';   

bootstrapApplication(AppComponent, appConfig) 
  .catch((err) => console.error(err));
