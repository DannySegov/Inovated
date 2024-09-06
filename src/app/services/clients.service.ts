import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ClientResponse } from '../shared/interfaces/clients';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);
  private clientSource = new BehaviorSubject<any>(null); // null es el valor inicial
  public currentClient = this.clientSource.asObservable();

  constructor() { }

  changeClient(client: any) { //Este método actualiza el valor de clientSource llamando a next(client), lo que a su vez notifica a todos los suscriptores de currentClient con el nuevo valor.
    this.clientSource.next(client);
  }

  getClients(elementos: number, pagina: number): Observable<ClientResponse[]> {
    return this.http.get<ClientResponse[]>(`${this.baseUrl}/clientes?elementos=${elementos}&pagina=${pagina}`);
  }
}
