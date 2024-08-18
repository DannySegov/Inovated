import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  private clientSource = new BehaviorSubject<any>(null); // null es el valor inicial
  public currentClient = this.clientSource.asObservable();

  constructor() { }

  changeClient(client: any) { //Este método actualiza el valor de clientSource llamando a next(client), lo que a su vez notifica a todos los suscriptores de currentClient con el nuevo valor.
    this.clientSource.next(client);
  }
}
