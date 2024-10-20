import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RequestResponse } from '../shared/interfaces/requests';
import { environment } from 'src/environments/environment';
import { ResponseAdd } from '../shared/interfaces/clients';
import { Service, ServiceResponse, ServicioRequerimentsResponse } from '../shared/interfaces/services';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  private http = inject(HttpClient);

  private readonly baseUrl: string = environment.baseUrl;
  private readonly headers: HttpHeaders = new HttpHeaders().set('Authorization', `Bearer ${this.accessToken}`);

  private dataService = new BehaviorSubject<any>(null);
  currentData = this.dataService.asObservable();
  
  private servicesSource = new BehaviorSubject<any[]>([]); 
  public services$ = this.servicesSource.asObservable();

  private servicioOfreceIDSource = new BehaviorSubject<number | null>(null);
  currentServicioOfreceID = this.servicioOfreceIDSource.asObservable();

  constructor() { }

  // Obtener Servicios
  getServices(elementos: number, pagina: number): Observable<ServiceResponse> {
    return this.http.get<ServiceResponse>(`${this.baseUrl}/servicios`, { headers: this.headers });
  }

  // Crear Servicio
  addService(service: ServicioRequerimentsResponse): Observable<ResponseAdd> {
    return this.http.post<ResponseAdd>(`${this.baseUrl}/servicios`, service, { headers: this.headers });
  }

  // Obtener Servicio por ID
  getServiceById(servicioOfreceID: number): Observable<Service> {
    return this.http.get<Service>(`${this.baseUrl}/servicios/info/${servicioOfreceID}`, { headers: this.headers });
  }

  // Actualizar Servicio
  updateService(servicioOfreceID: number, service: ServicioRequerimentsResponse): Observable<ResponseAdd> {
    return this.http.put<ResponseAdd>(`${this.baseUrl}/servicios/${servicioOfreceID}`, service, { headers: this.headers });
  }

  // Eliminar Servicio
  deleteService(servicioOfreceID: number): Observable<ResponseAdd> {
    return this.http.delete<ResponseAdd>(`${this.baseUrl}/servicios/${servicioOfreceID}`, { headers: this.headers });
  }

  // Método para actualizar la lista de servicios
  updateServicesList() {
    this.getServices(10, 1).subscribe(response => {
      this.servicesSource.next(response.datos); // Actualizar la lista de servicios
      console.log('Servicios:', response.datos);
    });
  }

  // Método para obtener el token de acceso
  get accessToken(): string | null {
    return localStorage.getItem('access');
  }

  changeData(data: any) {
    this.dataService.next(data);
  }

  changeServicioOfreceID(id: number) {
    this.servicioOfreceIDSource.next(id);
  }
}
