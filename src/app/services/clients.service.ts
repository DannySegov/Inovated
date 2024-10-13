import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, Subject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseAdd, DataClient, ClientIDResponse } from '../shared/interfaces/clients';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  private http = inject(HttpClient);

  private readonly baseUrl: string = environment.baseUrl;
  private readonly headers: HttpHeaders = new HttpHeaders().set('Authorization', `Bearer ${this.accessToken}`);

  private clientsSource = new BehaviorSubject<any[]>([]); // Lista de clientes inicializada vacía
  public clients$ = this.clientsSource.asObservable();
  
  private clientSource = new BehaviorSubject<any>(null);
  currentClient = this.clientSource.asObservable();

  public clienteID = new Subject<number>();
  clienteID$ = this.clienteID.asObservable();

  constructor() { }


  // Obtener Clientes
  getClients(elementos: number, pagina: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/clientes?elementos=${elementos}&pagina=${pagina}`, { headers: this.headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  // Crear Cliente
  addClients(dataClient: DataClient): Observable<ResponseAdd> {
    return this.http.post<ResponseAdd>(`${this.baseUrl}/clientes`, dataClient, { headers: this.headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  // Obtener Cliente por ID
  getClientById(clienteID: number): Observable<ClientIDResponse> {
    return this.http.get<ClientIDResponse>(`${this.baseUrl}/clientes/info/${clienteID}`, { headers: this.headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  // Eliminar Cliente
  deleteClient(clienteID: number): Observable<ResponseAdd> {
    return this.http.delete<ResponseAdd>(`${this.baseUrl}/clientes/eliminar/${clienteID}`, { headers: this.headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  // Método para obtener el token de acceso
  get accessToken(): string | null {
    return localStorage.getItem('access');
  }

  // Método para establecer el valor de clienteID
  setClienteID(clienteID: number) {
    this.clienteID.next(clienteID);
    return clienteID; 
  }

  // Método para manejar errores
  private handleError(error: any): Observable<never> {
    console.error('An error occurred', error);
    return throwError(error);
  }

  // Método para actualizar la lista de clientes
  updateClientsList() {
    this.getClients(10, 1).subscribe(response => {
      this.clientsSource.next(response.datos); // Actualizar la lista de clientes
    });
  }

  changeClient(client: any) {
    this.clientSource.next(client);
  }
}