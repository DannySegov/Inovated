import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();

    const handleRequest = (request: HttpRequest<any>) => {
      return next.handle(request).pipe(
        catchError((err: HttpErrorResponse) => {
          console.log('Error en la petición, intentando refrescar el token...', err);
          if (err.status === 401) { // Solo intentar refrescar el token si el error es 401 (Unauthorized)
            return this.authService.refreshToken().pipe(
              switchMap((res) => {
                if (res && res.access) {
                  console.log('Token de acceso actualizado exitosamente.');
                  this.authService.setToken(res.access); // Guardar el nuevo token

                  const newReq = request.clone({
                    setHeaders: {
                      Authorization: `Bearer ${res.access}`
                    }
                  });
                  return next.handle(newReq); // Continuar con la petición
                } else {
                  console.log('No se pudo actualizar el token de acceso, cerrando sesión...');
                  this.authService.logout();
                  return throwError(() => new Error('No se pudo actualizar el token de acceso'));
                }
              }),
              catchError((refreshErr) => {
                console.log('Error al refrescar el token, cerrando sesión...', refreshErr);
                this.authService.logout();
                return throwError(() => new Error(refreshErr));
              })
            );
          } else {
            return throwError(() => err);
          }
        })
      );
    };

    if (req.url.includes('/auth/verificar')) {
      const authReq = req.clone({
        body: { token: token ? token : '' }
      });
      return handleRequest(authReq);
    } else {
      const authReq = req.clone({
        setHeaders: {
          Authorization: token ? `Bearer ${token}` : ''
        }
      });
      return handleRequest(authReq);
    }
  }
}