import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RequestResponse } from '../shared/interfaces/requests';
import { ResponseAdd } from '../shared/interfaces/clients';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  private http = inject(HttpClient);

  private readonly baseUrl: string = environment.baseUrl;
  private readonly headers: HttpHeaders = new HttpHeaders().set('Authorization', `Bearer ${this.accessToken}`);

  private requestsSource = new BehaviorSubject<any[]>([]); // Lista de clientes inicializada vacía
  public requests$ = this.requestsSource.asObservable();

  constructor() { }

   // Obtener Solicitudes de Servicio
   getRequests(elementos: number, pagina: number): Observable<RequestResponse> {
    return this.http.get<RequestResponse>(`${this.baseUrl}/solicitud-servicio`, { headers: this.headers })
  }

  // Obtener Solicitud de Servicio por ID
  getRequestById(servicioID: number): Observable<RequestResponse> {
    return this.http.get<RequestResponse>(`${this.baseUrl}/solicitud-servicio/info/${servicioID}`, { headers: this.headers })
  }

  //Eliminar Solicitud de Servicio
 deleteRequest(servicioID: number): Observable<ResponseAdd> {
    return this.http.delete<ResponseAdd>(`${this.baseUrl}/solicitud-servicio/elimina/${servicioID}`, { headers: this.headers })
 }

   // Método para actualizar la lista de solicitudes de servicio
   updateRequestsList() {
    this.getRequests(10, 1).subscribe(response => {
      this.requestsSource.next(response.datos); // Actualizar la lista de clientes
    });
  }

   // Método para obtener el token de acceso
   get accessToken(): string | null {
    return localStorage.getItem('access');
  }
}
