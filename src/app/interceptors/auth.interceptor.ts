/*
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, switchMap, throwError, of } from 'rxjs';

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
      console.log('Error en la petición, intentando refrescar el token...', err);
      return authService.refreshToken().pipe(
        switchMap((res) => {
          if (res && res.access) {
            console.log('Token de acceso actualizado exitosamente.');
            authService.setToken(res.access); // Guardar el nuevo token

            const newReq = req.clone({ // Clonar la petición
              setHeaders: {
                Authorization: `Bearer ${res.access}`
              }
            });
            return next(newReq); // Continuar con la petición
          } else {
            console.log('No se pudo actualizar el token de acceso, cerrando sesión...');
            authService.logout();
            return throwError(() => new Error('No se pudo actualizar el token de acceso'));
          }
        }),
        catchError((refreshErr) => {
          console.log('Error al refrescar el token, cerrando sesión...', refreshErr);
          authService.logout();
          return throwError(() => new Error(refreshErr));
        })
      );
    })
  );
};*/