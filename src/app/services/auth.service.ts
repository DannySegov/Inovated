import { HttpClient, HttpHeaders } from '@angular/common/http';
import { computed, inject, Injectable, Injector, signal } from '@angular/core';
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

  private readonly baseUrl: string = environment.baseUrl;
  private http: HttpClient;
  private toastController: ToastController;
  private router: Router;

  private _currentUser = signal<User | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());

  constructor(private injector: Injector) { 
    this.http = this.injector.get(HttpClient);
    this.toastController = this.injector.get(ToastController);
    this.router = this.injector.get(Router);

    console.log('Constructor: Iniciando validación del token...');
    this.validateToken().subscribe(isValid => {
      console.log('Constructor: Resultado de la validación del token:', isValid);
    });

    this.checkAuthStatus().subscribe();
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
    console.log('Estableciendo autenticación:', user, access, refresh);
    this._currentUser.set(user);
    this._authStatus.set(AuthStatus.authenticated);
    this.setToken(access);
    this.setRefreshToken(refresh);
    return true;
  }

  login(user: User): Observable<boolean> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/auth/get`, user).pipe(
      map(({ access, refresh }) => {
        this.setAuthentication(user, access, refresh);
        this.presentToast('Inicio de sesión exitoso', 'top', 'success');
        return true;
      }),
      catchError(err => throwError(() => err.error.message))
    );
  }

  checkAuthStatus(): Observable<boolean> {
    const access = localStorage.getItem('access');

    if (!access) {
        this.logout();
        return of(false);
    }

    return this.validateToken();
  }

  refreshToken(): Observable<RefreshResponse> {
    const refreshToken = this.getRefreshToken();
    console.log('Intentando refrescar el token con:', refreshToken);
    return this.http.post<RefreshResponse>(`${this.baseUrl}/auth/actualizar`, { refreshToken });
  }

  validateToken(): Observable<boolean> {
    const access = localStorage.getItem('access');
    
    if (!access) {
      console.log('No se encontró token, estableciendo estado no autenticado.');
      this._authStatus.set(AuthStatus.notAuthenticated);
      return of(false);
    }
  
    console.log('Validando token a través de los encabezados');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${access}`);
  
    return this.http.post<any>(`${this.baseUrl}/auth/verificar`, null, { headers }).pipe(
      map(({ user, access, refresh }) => {
        console.log('Token válido, estableciendo autenticación.');
        return this.setAuthentication(user, access, refresh);
      }),
      catchError((error) => {
        console.log('Error al verificar el token:', error);
        this._authStatus.set(AuthStatus.notAuthenticated); 
        return of(false);
      })
    );
  }

  logout(): void {
    console.log('Cerrando sesión...');
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    localStorage.removeItem('url');
    this.presentToast('Cierre de sesión exitoso', 'top', 'success');
    this._currentUser.set(null);
    this._authStatus.set(AuthStatus.notAuthenticated);
    this.router.navigate(['/auth']);
  }

  setToken(access: string) {
    console.log('Guardando token de acceso:', access);
    localStorage.setItem('access', access);
  }

  setRefreshToken(refresh: string) {
    console.log('Guardando token de refresco:', refresh);
    localStorage.setItem('refresh', refresh);
  }

  getToken() {
    const access = localStorage.getItem('access');
    console.log('Obteniendo token de acceso:', access);
    return access;
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