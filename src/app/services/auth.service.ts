import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User, AuthResponse, AuthStatus } from '../shared/interfaces/auth';
import { Observable, tap, map, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl: string = environment.baseUrl; // Obtenemos la URL del archivo environment.ts
  private http = inject(HttpClient); // Inyectamos el servicio HttpClient

  private _currentUser = signal<User | null>(null); // Creamos una señal para almacenar el usuario actual
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());

  constructor() { }

  login(user: User): Observable<Boolean> {
    return this.http
      .post<AuthResponse>(`${this.baseUrl}/auth/get`, user)
      .pipe(
        map((resp) => {
          console.log({ resp }, 'INICIO SESIÓN');
          return true;
        }),
        catchError((error) => {
          console.error('Error al iniciar sesión:', error);
          return of(false);
        })
      );
  }


}