import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User, AuthResponse, AuthStatus, loginResponse } from '../shared/interfaces/auth';
import { Observable, tap, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl: string = environment.baseUrl; //Obtenemos la url del archivo environment.ts
  private http = inject( HttpClient ); //Inyectamos el servicio HttpClient

  private _currentUser = signal<User | null>(null); //Creamos una señal para almacenar el usuario actual
  private _authStatus = signal<AuthStatus>( AuthStatus.checking );

  public currentUser = computed( () => this._currentUser() );
  public authStatus = computed( () => this._authStatus() ); 

  constructor() { }

  login(email: string, password: string): Observable<boolean> {
    const url = `${this.baseUrl}/auth/get`; // URL de la API de login
    
    return this.http.post<loginResponse>( url, { email, password })
    .pipe(
      tap( ({ user, token }) => {
        localStorage.setItem('token', token);
        this._currentUser(  );
        this._authStatus(  );
      }),
      map(() => true)
    );
  }
}