import { Component, EventEmitter, inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ClientsService } from '../../services/clients.service';
import { IonModal } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-info',
  templateUrl: './modal-info.component.html',
  styleUrls: ['./modal-info.component.scss'],
})
export class ModalInfoComponent implements OnInit {

  private router = inject(Router);

  @ViewChild(IonModal) modal!: IonModal;
  @Output() close = new EventEmitter<void>();
  client: any;

  buttons = [
    { Icon: 'cotizar', Url: '/main/clients/service-request' },
    { Icon: 'historial', Url: '/quote' },
    { Icon: 'editar', Url: '/quote' },
    { Icon: 'eliminar', Url: '/quote' },
  ];

  buttonsRequest = [
    { icon: 'asignar', label: "Asignar", url: '/main/clients/service-request' },
    { icon: 'editar', label: "Editar", url: '/quote' },
    { icon: 'eliminar', label: "Eliminar", url: '/quote' },
  ];

  ngOnInit() {

  }

  /*
  openModal() {
    if (this.modal) {
      this.modal.present();
    }
  }
    */
  closeModal() {
    if (this.modal) {
      this.modal.dismiss().then(() => {
        this.close.emit();
      });
    }
  }


  get hoverColor() {
    return this.client.color;
  }

  onCardClick() {
    console.log('Card clicked');
    this.router.navigate(['/main/clients/service-request']);
   this.closeModal();
  }



  @ViewChild('modalRequest', { static: true }) modalRequest!: IonModal;
  @ViewChild('modalClient', { static: true }) modalClient!  : IonModal;

  // Método para abrir el modal de solicitudes
  openRequestModal(client: any) {
    this.client = client;
    this.modalRequest.present();
  }

  openClientModal(client: any) {
    this.client = client;
    this.modalClient.present();
  }
}