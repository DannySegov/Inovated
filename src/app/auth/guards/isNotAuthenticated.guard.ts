import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AuthStatus } from 'src/app/shared/interfaces/auth';

export const isNotAuthenticatedGuard: CanActivateFn = () => {

  const authService = inject(AuthService);
  const router = inject(Router);
  
  if (authService.authStatus() === AuthStatus.authenticated) {
    router.navigateByUrl('/main/home');
    return false;
  }

  return true; 
};
