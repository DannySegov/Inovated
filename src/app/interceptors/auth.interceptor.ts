import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('access');

    const authReq = req.clone({
      setHeaders: {
        Authorization: token ? `Bearer ${token}` : ''
      }
    });

    return next.handle(authReq).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          return this.authService.refreshToken().pipe(
            switchMap((res) => {
              if (res && res.access) {
                this.authService.setToken(res.access);
                const newReq = req.clone({
                  setHeaders: {
                    Authorization: `Bearer ${res.access}`
                  }
                });
                return next.handle(newReq);
              } else {
                return throwError(() => new Error('No se pudo actualizar el token de acceso'));
              }
            }),
            catchError((refreshErr) => {
              return throwError(() => new Error(refreshErr));
            })
          );
        } else {
          return throwError(() => err);
        }
      })
    );
  }
}