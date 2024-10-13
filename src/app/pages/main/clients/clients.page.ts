import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ClientsService } from 'src/app/services/clients.service';
import { ModalInfoComponent } from 'src/app/shared/components/modal-info/modal-info.component';
import { Client } from 'src/app/shared/interfaces/clients';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.page.html',
  styleUrls: ['./clients.page.scss'],
})
export class ClientsPage implements OnInit {

  @ViewChild(ModalInfoComponent) modalInfoComponent!: ModalInfoComponent;
  private clientsService = inject(ClientsService);

  public clients: Client[] = [];
  private currentPage: number = 1;
  private totalPages: number = 0;

  constructor() { }

  ngOnInit() {
    this.getClients();
  }

  getClients() { // Método para obtener los clientes
    this.clientsService.getClients(10, 1).subscribe({
      next: (resp: any) => {
        if (resp.estatus) {
          this.clients = resp.datos;
          console.log('Clientes:', this.clients);
        } else {
          console.error('Error al recuperar los clientes:', resp.mensaje);
        }
      },
      error: (error) => {
        console.error('Error en la llamada al servicio de clientes:', error);
      }
    })
  }

  openClientModal(client: Client) {
    this.modalInfoComponent.openClientModal(client.clienteID);
    this.clientsService.changeClient(client); // Enviar datos al servicio
  }
}
