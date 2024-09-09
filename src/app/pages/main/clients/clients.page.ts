import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ClientsService } from 'src/app/services/clients.service';
import { ModalInfoComponent } from 'src/app/shared/components/modal-info/modal-info.component';
import { Client, ClientResponse } from 'src/app/shared/interfaces/clients';

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
/*
  clients = [
    { id: 1, name: 'Obed Jimenez Mendoza', address: 'Paseo de los Gavilanes #132-A', color: '#b9cb2d' },
    { id: 2, name: 'Sebastian Bolaños', address: 'Grabadores de Aurora #112', color: '#f95252' },
    { id: 3, name: 'Esteban Ortiz Villalpando', address: 'Eilat #1506 in 202 Los Angeles', color: '#0092d1' },
    { id: 4, name: 'Diana Sanchez', address: 'Palo cuarto #117 El coecillo', color: '#d31e3c' },
    { id: 5, name: 'Guillermo Carranza', address: 'Pueblo Nuevo #122 San Pedro', color: '#17a9bf' },
    { id: 6, name: 'Diana Victoria Guerrero', address: 'Xichu #106 Moderna, León', color: '#0d3d57' },
  ];
  */

/*
  onCardClick(client: any) {
    this.clientsService.changeClient(client);
  }
    */

/*
  getClients() {
    this.clientsService.getClients(10, 1).subscribe((resp: ClientResponse[]) => {
      console.log('Clientes', resp);
    });
  } 
    */


  /*
  getClients(page: number = 1) {
    this.clientsService.getClients(10, page).subscribe(
        (resp: any) => {
            if (resp.estatus) {
                this.clients = resp.datos.map((client: any) => {
                    client.color = this.getRandomColor();
                    return client;
                });
                this.totalPages = Math.ceil(resp.paginador.total / resp.paginador.limite);
                this.currentPage = resp.paginador.pagina;
                console.log('Clientes', this.clients);
            } else {
                console.error('Error al recuperar los datos de los clientes:', resp.mensaje);
            }
        },
        (error) => {
            console.error('Error en la llamada al servicio de clientes:', error);
        }
    );
}
    */

getClients(page: number = 1) {
  this.clientsService.getClients(10, page).subscribe(
      (resp: any) => {
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
              console.log('Clientes', this.clients);
          } else {
              console.error('Error al recuperar los datos de los clientes:', resp.mensaje);
          }
      },
      (error) => {
          console.error('Error en la llamada al servicio de clientes:', error);
      }
  );
}

  onCardClick(client: any) {
    this.modalInfoComponent.openClientModal(client);
    this.clientsService.changeClient(client);
  }

  onScroll(event: any) {
    const scrollElement = event.target;
    const threshold = 150; // Umbral para cargar más datos antes de llegar al final

    if (scrollElement.scrollHeight - scrollElement.scrollTop <= scrollElement.clientHeight + threshold) {
        if (this.currentPage < this.totalPages) {
            this.getClients(this.currentPage + 1);
        }
    }
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
