import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';

import { BROWSER_STORAGE } from './storage';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const storage = inject(BROWSER_STORAGE);
  const token = storage.getItem('travlr-token');

  const protectedMethods = ['POST', 'PUT', 'DELETE'];

  if (
    token &&
    req.url.startsWith('http://localhost:3000/api/trips') &&
    protectedMethods.includes(req.method)
  ) {
    const authenticatedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    return next(authenticatedRequest);
  }

  return next(req);
};