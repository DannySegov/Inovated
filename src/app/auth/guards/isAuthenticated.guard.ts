import { inject } from '@angular/core';
import type { CanActivateFn } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AuthStatus } from 'src/app/shared/interfaces/auth';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  if ( authService.authStatus() === AuthStatus.authenticated ) {
    return true;
  } else {
    authService.logout();
    return false;
  }

  return true;
};
