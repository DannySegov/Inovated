import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceRequeriments, ServicioRequerimentsResponse } from '../shared/interfaces/services';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceRequerimentsService {

  private http = inject(HttpClient);
  private readonly baseUrl: string = environment.baseUrl;
  private readonly accessToken: string | null = localStorage.getItem('access');
  private readonly headers: HttpHeaders = new HttpHeaders().set('Authorization', `Bearer ${this.accessToken}`);

  constructor() { }

  getServiceRequeriments(): Observable<ServicioRequerimentsResponse> {
    return this.http.get<ServicioRequerimentsResponse>(`${this.baseUrl}/solicitud-servicio/servicios-ofrece`, { headers: this.headers });
  }

  addServiceRequeriments(clienteID: number, request: ServiceRequeriments): Observable<any> {
    return this.http.post<ServiceRequeriments>(`${this.baseUrl}/solicitud-servicio/${clienteID}`, request, { headers: this.headers });
  }
}