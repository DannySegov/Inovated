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
    this.clientsService.clients$.subscribe(clientes => {
      this.clients = clientes;
    });

    // Actualizar la lista de clientes al iniciar el componente
    this.clientsService.updateClientsList();
  }

  getClients(page: number = 1) { // Método para obtener los clientes
    this.clientsService.getClients(10, 1).subscribe({
      next: (resp: any) => {
        if (resp.estatus) {
          this.clients = resp.datos.map((client: Client) => {
            const storedColor = localStorage.getItem(`client-color-${client.clienteID}`);
            if (storedColor) {
              client.color = storedColor;
            } else {
              client.color = this.getRandomColor();
              localStorage.setItem(`client-color-${client.clienteID}`, client.color);
            }
            return client;
          });
          this.totalPages = Math.ceil(resp.paginador.total / resp.paginador.limite);
          this.currentPage = resp.paginador.pagina;
        } else {
          console.error('Error al recuperar los datos de los clientes:', resp.mensaje);
        }
      },
      error: (error) => {
        console.error('Error en la llamada al servicio de clientes:', error);
      },
      complete: () => {
        console.log('Llamada al servicio de clientes completada');
      }
    });
  }







/*
  onCardClick(client: any) {
    this.modalInfoComponent.openClientModal(client);
    this.clientsService.changeClient(client);
  }
    */
  onCardClick(client: Client) {
    this.modalInfoComponent.openClientModal(client.clienteID);
    console.log('Cliente seleccionado:', client.clienteID);
     console.log('Color del cliente:', client.color); // Imprimir el color del cliente
  }

  getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
