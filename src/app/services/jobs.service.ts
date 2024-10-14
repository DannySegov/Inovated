import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DepartmentResponse, Job, JobsResponse } from '../shared/interfaces/jobs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobsService {
  private http = inject(HttpClient);

  private readonly baseUrl: string = environment.baseUrl;
  private readonly headers: HttpHeaders = new HttpHeaders().set('Authorization', `Bearer ${this.accessToken}`);

  constructor() { }

  // Obtener Puestos
  getJobs(): Observable<DepartmentResponse> {
    return this.http.get<DepartmentResponse>(`${this.baseUrl}/accesos/puestos/`, { headers: this.headers });
  }

  // Obtener Puestos por ID
  getJobById(puestoID: number): Observable<JobsResponse> {
    return this.http.get<JobsResponse>(`${this.baseUrl}/accesos/puestos/info-puesto/${puestoID}`, { headers: this.headers });
  }

  // Método para obtener el token de acceso
  get accessToken(): string | null {
    return localStorage.getItem('access');
  }
}
