import { Component, inject, Input, OnInit } from '@angular/core';
import { ClientsService } from '../../../services/clients.service';

@Component({
  selector: 'app-info-client',
  templateUrl: './info-client.component.html',
  styleUrls: ['./info-client.component.scss'],
})
export class InfoClientComponent implements OnInit {

  private clientsService = inject(ClientsService);
  client: any;
  @Input() uprising: any;
  @Input() nombre!: string;
  @Input() direccion: any;
  @Input() telefono!: string;
  @Input() correo!: string;

  @Input() backgroundColor: string = '#f4f4f4';

  constructor() { }

  ngOnInit() {
    //this.currentClient();
  }

  /*
  currentClient() { // Método para obtener el cliente actual
    this.clientsService.currentClient.subscribe(client => { 
      this.client = client;
      if (client) {
        console.log('Info Cliente', client);
        this.clientsService.setClienteID(client.clienteID);
        console.log('ID Cliente',  this.clientsService.setClienteID(client.clienteID));  
      }
    });
  }
    */
}
