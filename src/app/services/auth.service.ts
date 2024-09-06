import { HttpClient, HttpHeaders } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User, AuthResponse, RefreshResponse, AuthStatus } from '../shared/interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl: string = environment.baseUrl; // Obtenemos la URL del archivo environment.ts
  private http = inject(HttpClient); // Inyectamos el servicio HttpClient
  private toastController = inject(ToastController);
  private router = inject(Router); // Inyectamos el servicio Router

  private _currentUser = signal<User | null>(null); // Creamos una señal para almacenar el usuario actual
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());

  constructor() { 
    this.validateToken().subscribe();
  }

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

  private setAuthentication(user: User, access: string, refresh: string) {
    this._currentUser.set(user);
    this._authStatus.set(AuthStatus.authenticated);
    this.setToken(access);
    this.setRefreshToken(refresh);
    return true;
  }

  login(user: User): Observable<boolean> { // Obtener Token
    return this.http.post<AuthResponse>(`${this.baseUrl}/auth/get`, user).pipe(
      map(({ access, refresh }) => {
        this.setAuthentication(user, access, refresh);
        this.presentToast('Inicio de sesión exitoso', 'top', 'success');
        return true;
      }),
      catchError(err => throwError(() => err.error.message))
    );
  }
  /*
  login(user: User): Observable<Boolean> { // Obtener Token
    return this.http.post<AuthResponse>(`${this.baseUrl}/auth/get`, user).pipe(
      map((resp) => {
        console.log('Respuesta de login:', resp);
        this.setToken(resp.access);
        this.setRefreshToken(resp.refresh);

        this.presentToast('Inicio de sesión exitoso', 'top', 'success');
        return true;
      }),
      catchError((error) => {
        console.log('Error al iniciar sesión:', error);
        this.presentToast('Error al iniciar sesión', 'top', 'danger');
        return of(false);
      })
    );
  }
    */

  refreshToken(): Observable<RefreshResponse> { // Actualizar Token
    const refreshToken = this.getRefreshToken();
    console.log('Intentando refrescar el token con:', refreshToken);
    return this.http.post<RefreshResponse>(`${this.baseUrl}/auth/actualizar`, { refreshToken });
  }

  validateToken(): Observable<boolean> {
    const token = this.getToken();
    
    if (!token) {
      this._authStatus.set(AuthStatus.notAuthenticated);
      return of(false);
    }
  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`${this.baseUrl}/auth/verificar`, {}, { headers }).pipe(
      map(({ user, access, refresh }) => this.setAuthentication(user, access, refresh)),
      catchError((error) => {
        console.log('Error al verificar el token:', error);
        this._authStatus.set(AuthStatus.notAuthenticated); 
        return of(false);
      })
    );
  }
  /*
  validateToken(): Observable<Boolean> { // Verificar Token
    const token = this.getToken();
    console.log('Validando token de acceso:', token);
    return this.http.post<boolean>(`${this.baseUrl}/auth/verificar`, { token });
  }
    */

  logout(): void {
    console.log('Cerrando sesión...');
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    localStorage.removeItem('url');
    this.presentToast('Cierre de sesión exitoso', 'top', 'success');
    this.router.navigate(['/auth']); // Redirigir a la página de autenticación
  }

  setToken(token: string) {
    console.log('Guardando token de acceso:', token);
    localStorage.setItem('access', token);
  }

  setRefreshToken(refresh: string) {
    console.log('Guardando token de refresco:', refresh);
    localStorage.setItem('refresh', refresh);
  }

  getToken() {
    const token = localStorage.getItem('access');
    console.log('Obteniendo token de acceso:', token);
    return token;
  }

  getRefreshToken() {
    const refreshToken = localStorage.getItem('refresh');
    console.log('Obteniendo token de refresco:', refreshToken);
    return refreshToken;
  }

  checkAndRefreshToken(): Observable<boolean> {
    console.log('Iniciando la verificación del token...');
    return this.validateToken().pipe(
      switchMap(isValid => {
        if (isValid) {
          console.log('El token de acceso es válido.');
          return of(true);
        } else {
          console.log('El token de acceso ha expirado, intentando refrescar el token...');
          return this.refreshToken().pipe(
            switchMap(response => {
              if (response && response.access) {
                this.setToken(response.access);
                console.log('Token de acceso actualizado exitosamente.');
                return of(true);
              } else {
                console.log('Ambos tokens han expirado, cerrando sesión...');
                this.logout();
                return of(false);
              }
            }),
            catchError((error) => {
              console.log('Error al refrescar el token, cerrando sesión...', error);
              this.logout();
              return of(false);
            })
          );
        }
      }),
      catchError((error) => {
        console.log('Error al validar el token, cerrando sesión...', error);
        this.logout();
        return of(false);
      })
    );
  }
}