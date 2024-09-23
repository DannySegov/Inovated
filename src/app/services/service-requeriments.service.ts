import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceRequeriments, ServicioRequerimentsResponse } from '../shared/interfaces/services';
import { ResponseAdd } from '../shared/interfaces/clients';
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

  getServiceRequeriments(): Observable<ServicioRequerimentsResponse> { // Método para obtener los servicios que ofrece la empresa
    return this.http.get<ServicioRequerimentsResponse>(`${this.baseUrl}/solicitud-servicio/servicios-ofrece`, { headers: this.headers });
  }

  addServiceRequeriments(clienteID: number, request: ServiceRequeriments): Observable<ResponseAdd> { // Método para crear una solicitud de servicio
    return this.http.post<ResponseAdd>(`${this.baseUrl}/solicitud-servicio/${clienteID}`, request, { headers: this.headers });
  }
}