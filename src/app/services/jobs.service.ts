import { computed, inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { DepartmentResponse, Job, JobsResponse, PermissionsResponse } from '../shared/interfaces/jobs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobsService {
  private http = inject(HttpClient);

  private readonly baseUrl: string = environment.baseUrl;
  private readonly headers: HttpHeaders = new HttpHeaders().set('Authorization', `Bearer ${this.accessToken}`);

  #job = signal<any>({
    jobs: []
  });

  #permission = signal<any>({
    permissions: []
  });

  public jobs = computed(() => this.#job().jobs);
  public permissions = computed(() => this.#permission().permissions);

  constructor() {
    this.getJobs();
    this.getPermissions();
   }

  // Obtener Puestos
  getJobs() {
    return this.http.get<DepartmentResponse>(`${this.baseUrl}/accesos/puestos/`, { headers: this.headers })
    .subscribe(response => {
      console.log('Puestos', response);
      this.#job.set({
        jobs: response.datos
      });
    })
  }

  // Obtener Puestos por ID
  getJobById(puestoID: number): Observable<JobsResponse> {
    return this.http.get<JobsResponse>(`${this.baseUrl}/accesos/puestos/info-puesto/${puestoID}`, { headers: this.headers });
  }

  // Método para obtener el token de acceso
  get accessToken(): string | null {
    return localStorage.getItem('access');
  }

  //Obtener Permisos
  getPermissions() {
    return this.http.get<PermissionsResponse>(`${this.baseUrl}/accesos/permisos/`, { headers: this.headers })
    .subscribe(response => {
      console.log('Permisos', response);
      this.#permission.set({
        permissions: response.datos
      });
    })
  }
}
