import { Component, EventEmitter, inject, OnInit, Output, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-info',
  templateUrl: './modal-info.component.html',
  styleUrls: ['./modal-info.component.scss'],
})
export class ModalInfoComponent implements OnInit {

  @ViewChild(IonModal) modal!: IonModal;
  @ViewChild('modalRequest', { static: true }) modalRequest!: IonModal;
  @ViewChild('modalClient', { static: true }) modalClient!: IonModal;
  @Output() close = new EventEmitter<void>();

  private router = inject(Router);

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
  closeModal() { // Método para cerrar el modal
    if (this.modal) {
      this.modal.dismiss().then(() => {
        this.close.emit();
      });
    }
  }

  get hoverColor() { // Método para obtener el color de hover
    return this.client.color;
  }

  onCardClick() { // Método para manejar el click en la tarjeta
    this.router.navigate(['/main/clients/service-request']);
    this.closeModal();
  }

  openRequestModal(client: any) {  // Método para abrir el modal de solicitudes
    this.client = client;
    this.modalRequest.present();
  }

  openClientModal(client: any) { // Método para abrir el modal de clientes
    this.client = client;
    this.modalClient.present();
  }
}