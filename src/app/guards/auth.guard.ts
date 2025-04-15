import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route : ActivatedRouteSnapshot) => {
  if (route.data['isPublic']) {
    return true;
  }
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.getToken()) {
    return true;
  }
  return router.createUrlTree(['/login']);
};