import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Observable, map, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User, AuthResponse, RefreshResponse } from '../shared/interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl: string = environment.baseUrl; // Obtenemos la URL del archivo environment.ts
  private http = inject(HttpClient); // Inyectamos el servicio HttpClient
  private toastController = inject(ToastController);

  constructor() { }

  private async presentToast(message: string, position: 'top' | 'middle' | 'bottom', color: 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger' | 'light' | 'medium' | 'dark') {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: position,
      color: color,
      mode: 'ios'
    });
    await toast.present();
  }

  login(user: User): Observable<Boolean> { // Obtener Token
    return this.http.post<AuthResponse>(`${this.baseUrl}/auth/get`, user).pipe(
      map((resp) => {
        console.log(resp);
        this.setToken(resp.access);
        this.setRefreshToken(resp.refresh);

        this.presentToast('Inicio de sesión exitoso', 'top', 'success');
        return true;
      }),
      catchError((error) => {
        this.presentToast('Error al iniciar sesión', 'top', 'danger');
        return of(false);
      })
    );
  }

  refreshToken() { // Actualizar Token
    const refreshToken = this.getRefreshToken();
    return this.http.post<RefreshResponse>(`${this.baseUrl}/auth/actualizar`, refreshToken);
  }

  validateToken(): Observable<Boolean> { //Verificar Token
    const token = this.getToken();
    return this.http.post<boolean>(`${this.baseUrl}/auth/verificar`, token);
  }

  logout(): void {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    localStorage.removeItem('url');
    this.presentToast('Cierre de sesión exitoso', 'top', 'success');
  }

  setToken(token: string) {
    localStorage.setItem('access', token);
  }

  setRefreshToken(refresh: string) {
    localStorage.setItem('refresh', refresh);
  }

  getToken() {
    return localStorage.getItem('access');
  }

  getRefreshToken() {
    return localStorage.getItem('refresh');
  }
}