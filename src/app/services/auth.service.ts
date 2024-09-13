import { HttpClient, HttpHeaders } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Observable, of, throwError, BehaviorSubject } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User, AuthResponse, AuthStatus, InfoUserResponse, RefreshResponse } from '../shared/interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);
  private userSubject = new BehaviorSubject<InfoUserResponse | null>(null);
  public user$ = this.userSubject.asObservable();

  constructor() {
    this.loadUserFromLocalStorage();
  }

  private _currentUser = signal<User | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());

  private toastController = inject(ToastController);

  private loadUserFromLocalStorage() {
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

  login(user: User): Observable<boolean> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/auth/get`, user).pipe(
      map(({ correo, refresh, access }) => {
        console.log('Respuesta del servidor:', { correo, refresh, access });
        return this.setAuthentication(user, refresh, access);
      }),
      map(() => {
        this.userSubject.next(null);
        return true;
      }),
      catchError(err => throwError(() => err.error.message))
    );
  }

  updateToken(refresh: string): Observable<boolean> {
    console.log('Token de actualización:', refresh);
  
    return this.http.post<RefreshResponse>(`${this.baseUrl}/auth/actualizar`, { refresh }).pipe(
      map(({ refresh, access }) => {
        console.log('Respuesta del servidor:', { refresh, access });
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
    const token = localStorage.getItem('access');
    if (!token) {
      this.logout();
      return of(false);
    }
  
    return this.http.post<any>(`${this.baseUrl}/auth/verificar`, { token })
      .pipe(
        switchMap((resp) => {
          console.log('Respuesta del servidor:', resp); // Imprimir la respuesta del servidor
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
            console.log('Error 401 recibido:', error.error.detail); // Imprimir el detalle del error
            const refresh = localStorage.getItem('refresh');
            console.log('Intentando obtener el token de actualización del localStorage:', refresh);
            if (refresh) {
              console.log('Token de actualización encontrado, llamando a updateToken...');
              this.updateToken(refresh).subscribe(() => {
                console.log('updateToken se ha ejecutado.');
              });
              console.log('Token de actualización:', refresh);
            } else {
              console.error('No se encontró el token de actualización en localStorage');
            }
            return of(false);
          }
          return throwError(() => error);
        })
      );
  }

  infoUser(): Observable<InfoUserResponse> {
    const accessToken = localStorage.getItem('access');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    
    return this.http.post<InfoUserResponse>(`${this.baseUrl}/auth/perfil`, {}, { headers });
}
  
  logout() {
    console.log('Cerrando sesión...');
    localStorage.clear();
    this._currentUser.set(null);
    this._authStatus.set(AuthStatus.notAuthenticated);
    this.userSubject.next(null);
    console.log('Sesión cerrada.');
  }
}