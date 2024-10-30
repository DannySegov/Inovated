import { HttpClient, HttpHeaders } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError, BehaviorSubject } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { User, AuthResponse, AuthStatus, InfoUserResponse } from '../shared/interfaces/auth';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  
  private readonly baseUrl: string = environment.baseUrl;
  private userSubject = new BehaviorSubject<InfoUserResponse | null>(null);
  public user$ = this.userSubject.asObservable();

  constructor() {
    this.loadUserFromLocalStorage();
  }

  private _currentUser = signal<User | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());

  private loadUserFromLocalStorage() { // Método para cargar el usuario desde el localStorage
    const user = localStorage.getItem('user');
    const refresh = localStorage.getItem('refresh');
    const access = localStorage.getItem('access');
    if (user && refresh && access) {
      this._currentUser.set(JSON.parse(user));
      this._authStatus.set(AuthStatus.authenticated);
      this.infoUser().pipe(
        tap(infoUserResponse => {
          this.userSubject.next(infoUserResponse);
        })
      ).subscribe();
    } else {
      this._authStatus.set(AuthStatus.notAuthenticated);
    }
  }

  private setAuthentication(user: User, refresh: string, access: string): boolean { // Método para establecer la autenticación
    this._currentUser.set(user);
    this._authStatus.set(AuthStatus.authenticated);
    localStorage.setItem('refresh', refresh);
    localStorage.setItem('access', access);
    localStorage.setItem('user', JSON.stringify(user)); // Guardar el usuario en localStorage
    return true;
  }

  login(user: User): Observable<boolean> { // Método para iniciar sesión
    return this.http.post<AuthResponse>(`${this.baseUrl}/auth/get`, user).pipe(
      map(({ correo, refresh, access }) => {
        return this.setAuthentication(user, refresh, access);
      }),
      map(() => {
        this.userSubject.next(null);
        return true;
      }),
      catchError(err => throwError(() => err.error.message))
    );
  }

  updateToken(refreshToken: string): Observable<void> { // Método para actualizar el token
    return this.http.post<any>(`${this.baseUrl}/auth/refresh`, { refreshToken })
      .pipe(
        tap(response => {
          if (response && response.accessToken) {
            localStorage.setItem('access', response.accessToken);
          } else {
            this.logout();
            throw new Error('Token de actualización ha expirado');
          }
        }),
        catchError(error => {
          this.logout();
          return throwError(() => error);
        })
      );
  }
  
  validateToken(): Observable<boolean> { // Método para validar el token
    const token = localStorage.getItem('access');
    if (!token) {
      this.logout();
      return of(false);
    }
  
    return this.http.post<any>(`${this.baseUrl}/auth/verificar`, { token })
      .pipe(
        switchMap((resp) => {
          if (resp === true) {
            return this.infoUser().pipe(
              tap(infoUserResponse => {
                this.userSubject.next(infoUserResponse);
              }),
              map(() => true)
            );
          }
          return of(false);
        }),
        catchError((error) => {
          if (error.status === 401 && error.error?.detail) {
            const refresh = localStorage.getItem('refresh');
            if (refresh) {
              return this.updateToken(refresh).pipe(
                switchMap(() => this.validateToken()),
                catchError(() => {
                  this.logout();
                  return of(false);
                })
              );
            } else {
              console.error('No se encontró el token de actualización en localStorage');
              this.logout();
              return of(false);
            }
          }
          this.logout();
          return throwError(() => error);
        })
      );
  }

  infoUser(): Observable<InfoUserResponse> { // Método para obtener la información del usuario
    const accessToken = localStorage.getItem('access');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);

    return this.http.post<InfoUserResponse>(`${this.baseUrl}/auth/perfil`, {}, { headers });
  }

  logout() { // Método para cerrar sesión
    localStorage.clear();
    this._currentUser.set(null);
    this._authStatus.set(AuthStatus.notAuthenticated);
    this.userSubject.next(null);
    this.router.navigate(['/auth'])
  }
}