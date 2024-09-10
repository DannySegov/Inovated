import { HttpClient, HttpHeaders } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User, AuthResponse, AuthStatus, InfoUserResponse } from '../shared/interfaces/auth';
import { ClientResponse } from '../shared/interfaces/clients';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);
  private user?: InfoUserResponse;

  constructor() {
    this.loadUserFromLocalStorage();
  }

  private _currentUser = signal<User | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());

  private toastController = inject(ToastController);
  private router = inject(Router);

  public async presentToast(message: string, position: 'top' | 'middle' | 'bottom', color: 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger' | 'light' | 'medium' | 'dark') {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: position,
      color: color,
      mode: 'ios'
    });
    await toast.present();
  }

  private setAuthentication(user: User, refresh: string, access: string): boolean {
    this._currentUser.set(user);
    this._authStatus.set(AuthStatus.authenticated);
    localStorage.setItem('refresh', refresh);
    localStorage.setItem('access', access);
    localStorage.setItem('user', JSON.stringify(user)); // Guardar el usuario en localStorage
    return true;
  }

  private loadUserFromLocalStorage() {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      const user = JSON.parse(userJson);
      this._currentUser.set(user);
      this._authStatus.set(AuthStatus.authenticated);
    }
  }

  login(user: User): Observable<boolean> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/auth/get`, user).pipe(
      map(({ correo, refresh, access }) => {
        console.log('Respuesta del servidor:', { correo, refresh, access });
        return this.setAuthentication(user, refresh, access);
      }),
      switchMap(() => this.infoUser()), // Llamar a infoUser después de la autenticación
      map(infoUserResponse => {
        this.user = infoUserResponse;
        return true;
      }),
      catchError(err => throwError(() => err.error.message))
    );
  }

  checkAuthentication(): Observable<boolean> {
    if (!localStorage.getItem('token')) return of(false);

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<User>(`http://localhost:8000/api/v1/rest/auth/perfil`, {}, { headers })
      .pipe(
        tap(user => this.user = user as any),
        map(user => !!user),
        catchError(err => of(false))
      );
  }

  updateToken(): Observable<boolean> {
    const refresh = localStorage.getItem('refresh');
    console.log('Token de actualización:', refresh);
    const body = { refresh };
  
    return this.http.post<AuthResponse>(`${this.baseUrl}/auth/actualizar`, body).pipe(
      map(({ correo, refresh, access }) => {
        console.log('Respuesta del servidor:', { correo, refresh, access });
        localStorage.setItem('refresh', refresh);
        localStorage.setItem('access', access);
        return true;
      }),
      catchError(err => {
        console.error('Error en updateToken:', err);
        return of(false);
      })
    );
  }

  validateToken(): Observable<boolean> {
    const token = localStorage.getItem('token');
    if (!token) return of(false);
  
    return this.http.post<any>(`${this.baseUrl}/auth/verificar`, token)
    .pipe(
      map((resp) => {
          console.log('Respuesta del servidor:', resp); // Imprimir la respuesta del servidor
          return resp;
      }),
      catchError((error) => {
         console.error('Error en la validación del token:', error); // Imprimir el error
          return of(false);
      })
  );
  }

  infoUser(): Observable<InfoUserResponse> {
    return this.validateToken().pipe(
      switchMap(isValid => {
        if (!isValid) {
          return this.updateToken().pipe(
            switchMap(success => {
              if (success) {
                return this.fetchUserInfo();
              } else {
                return throwError(() => new Error('No se pudo actualizar el token'));
              }
            })
          );
        } else {
          return this.fetchUserInfo();
        }
      }),
      catchError(err => {
        console.error('Error en la llamada al traer info:', err);
        return throwError(() => err);
      })
    );
  }

  private fetchUserInfo(): Observable<InfoUserResponse> {
    const accessToken = localStorage.getItem('access');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    
    return this.http.post<InfoUserResponse>(`${this.baseUrl}/auth/perfil`, {}, { headers })
      .pipe(
        tap(response => {
          console.log('Respuesta recibida:', response);
        }),
        catchError(err => {
          console.error('Error en la llamada al traer info:', err);
          return throwError(() => err);
        })
      );
  }
  
  logout() {
    console.log('Cerrando sesión...');
    localStorage.clear();
    this._currentUser.set(null);
    this._authStatus.set(AuthStatus.notAuthenticated);
    console.log('Sesión cerrada.');
  }
}