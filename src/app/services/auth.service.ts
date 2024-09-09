import { HttpClient, HttpHeaders } from '@angular/common/http';
import { computed, Inject, inject, Injectable, Injector, signal } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User, AuthResponse, RefreshResponse, AuthStatus, InfoUser } from '../shared/interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);
  private user?: InfoUser;

  constructor() { }

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

  private setAuthentication(user: User,  refresh:string, access:string): boolean {

    this._currentUser.set( user );
    this._authStatus.set( AuthStatus.authenticated );
    localStorage.setItem('refresh', refresh);
    localStorage.setItem('access', access);

    return true;
  }

  login(user: User): Observable<boolean> {
  
    return this.http.post<AuthResponse>(`${this.baseUrl}/auth/get`, user).pipe(
      map(({ correo, refresh, access }) => {
        console.log('Respuesta del servidor:', { correo, refresh, access });
        return this.setAuthentication(user, refresh, access);
      }),
      catchError(err => throwError(() => err.error.message))
    );
  }

  /*
  checkAuthentication(): Observable<any> | any {
    if ( !localStorage.getItem('access') ) return false;

    const access = localStorage.getItem('access');

    return this.http.post<InfoUser>(`${this.baseUrl}/auth/perfil`)
    .pipe(
      tap( user => this.user = user ),
      map( user => !!user),
      catchError( err => of(false) )
    )
  }
    */

  checkAuthentication(): Observable<boolean> {

    if (!localStorage.getItem('token')) return of(false);

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<any>(`http://localhost:8000/api/v1/rest/auth/perfil`, {}, { headers })
      .pipe(
        tap(user => this.user = user),
        map(user => !!user),
        catchError(err => of(false))
      );
}

  logout() {
    localStorage.clear();
    this._currentUser.set(null);
    this._authStatus.set( AuthStatus.notAuthenticated );
  }
}