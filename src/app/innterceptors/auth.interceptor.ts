import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, switchMap, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService);
  const token = authService.getToken();

  const authReq = req.clone({
    setHeaders: { // Agregar el token a la cabecera de la petición
      Authorization: token ? `Bearer ${token}` : ''
    }
  });

  return next(authReq).pipe(
    catchError((err) => {
      return authService.refreshToken().pipe(
        switchMap((res) => {
          //Guardar el nuevo token
          //this.authService.setToken(res.access);  
          localStorage.setItem('token', res.access); // Guardar el nuevo token

          const newReq = req.clone({ // Clonar la petición
            setHeaders: {
              Authorization: `Bearer ${res.access}`
            }
          });
          return next(newReq); // Continuar con la petición
        }),
        catchError((refreshErr) => {
          const finalError = new Error(refreshErr);

          localStorage.removeItem('token'); // Eliminar el token
          localStorage.removeItem('refresh'); // Eliminar el refresh token
          return throwError(() => finalError);
        })
      )
    })
  ); // Continuar con la petición
};
