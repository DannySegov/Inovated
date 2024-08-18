import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ClientsService } from '../../services/clients.service';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-modal-info',
  templateUrl: './modal-info.component.html',
  styleUrls: ['./modal-info.component.scss'],
})
export class ModalInfoComponent  implements OnInit {

  constructor(private clientsService: ClientsService) { }

  
  //@Input() client!: { name: string, color: string };
  @ViewChild(IonModal) modal!: IonModal;
  client: any
  
  buttons = [
    { Icon: 'cotizar'},
    { Icon: 'historial'},
    { Icon: 'editar'},
    { Icon: 'eliminar'},
  ];

  ngOnInit() {
    this.clientsService.currentClient.subscribe(client => {
      this.client = client;
      if (client) {
        console.log('Received client data in ModalInfoComponent:', client);
        this.openModal();
      }
    });
  }

  openModal() {
    if (this.modal) {
      this.modal.present();
    }
  }

  closeModal() {
    if (this.modal) {
      this.modal.dismiss();
    }
  }
}
