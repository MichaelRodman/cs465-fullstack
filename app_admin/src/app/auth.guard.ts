/**
 * File: auth.guard.ts
 * Author: Michael Rodman
 * Date: September 20, 2026
 * Course: CS 499 Computer Science Capstone
 *
 * Purpose:
 * Protect administrative routes from unauthenticated access.
 * Users without a valid JWT are redirected to the login page.
 */

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthenticationService } from './services/authentication.service';

export const authGuard: CanActivateFn = () => {
  const authenticationService = inject(AuthenticationService);
  const router = inject(Router);

  if (authenticationService.isLoggedIn()) {
    return true;
  }

  return router.createUrlTree(['/login']);
};