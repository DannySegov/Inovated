import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UprisingsService {
  private http = inject(HttpClient);

  private readonly baseUrl: string = environment.baseUrl;
  private readonly headers: HttpHeaders = new HttpHeaders().set('Authorization', `Bearer ${this.accessToken}`);

  constructor() { }

  //Obtener Levantamientos
  getUprisings(elementos: number, pagina: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/levantamientos`, { headers: this.headers });
  }

  // Método para obtener el token de acceso
  get accessToken(): string | null {
    return localStorage.getItem('access');
  }
}
