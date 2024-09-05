import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AuthStatus } from 'src/app/shared/interfaces/auth';

export const isNotAuthenticatedGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);
  
  if ( authService.authStatus() === AuthStatus.authenticated ) {
    return true;
  } 

  router.navigateByUrl('/auth');
  return false;
};
