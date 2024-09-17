import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, Subject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ClientResponse, ClientResponseAdd, DataClient } from '../shared/interfaces/clients';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  private http = inject(HttpClient);

  private readonly baseUrl: string = environment.baseUrl;
  private readonly headers: HttpHeaders = new HttpHeaders().set('Authorization', `Bearer ${this.accessToken}`);

  private clientSource = new BehaviorSubject<any>(null); // null es el valor inicial
  public currentClient = this.clientSource.asObservable();
  
  public clienteID = new Subject<number>();
  clienteID$ = this.clienteID.asObservable();

  constructor() { }

  changeClient(client: any) { //Este método actualiza el valor de clientSource llamando a next(client), lo que a su vez notifica a todos los suscriptores de currentClient con el nuevo valor.
    this.clientSource.next(client);
  }

  //Obtener Clientes
  getClients(elementos: number, pagina: number): Observable<ClientResponse[]> {
    return this.http.get<ClientResponse[]>(`${this.baseUrl}/clientes?elementos=${elementos}&pagina=${pagina}`, { headers: this.headers })
      .pipe(
        catchError(err => {
          console.error('Error en la llamada al servicio de clientes:', err);
          return throwError(err);
        })
      );
  }

  //Crear Cliente
  addClients(dataClient: DataClient): Observable<ClientResponseAdd> {
    return this.http.post<ClientResponseAdd>(`${this.baseUrl}/clientes`,{ dataClient }, { headers: this.headers })
  }

  get accessToken(): string | null { // Método para obtener el token de acceso
    return localStorage.getItem('access');
  }

  setClienteID(clienteID: number) { // Método para establecer el valor de clienteID
    this.clienteID.next(clienteID);
    return clienteID; 
  }
}
