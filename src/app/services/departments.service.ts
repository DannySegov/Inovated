import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DepartmentResponse } from '../shared/interfaces/departments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {
  private http = inject(HttpClient);

  private readonly baseUrl: string = environment.baseUrl;
  private readonly headers: HttpHeaders = new HttpHeaders().set('Authorization', `Bearer ${this.accessToken}`);

  constructor() { }

  // Obtener Departamentos
  getDepartments(): Observable<DepartmentResponse> {
    return this.http.get<DepartmentResponse>(`${this.baseUrl}/accesos/departamentos/`, { headers: this.headers });
  }

  // Método para obtener el token de acceso
  get accessToken(): string | null {
    return localStorage.getItem('access');
  }
}
