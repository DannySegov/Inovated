import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseAdd } from '../shared/interfaces/clients';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private http = inject(HttpClient);

  private readonly baseUrl: string = environment.baseUrl;
  private readonly headers: HttpHeaders = new HttpHeaders().set('Authorization', `Bearer ${this.accessToken}`);

  constructor() { }

  //Eliminar Usuario
  deleteUser(usuarioID: number): Observable<ResponseAdd> {
    return this.http.delete<ResponseAdd>(`${this.baseUrl}/usuarios/eliminar/${usuarioID}`, { headers: this.headers });
  }

    // Método para obtener el token de acceso
    get accessToken(): string | null {
      return localStorage.getItem('access');
    }

}
