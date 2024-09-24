import { Component, EventEmitter, inject, OnInit, Output, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { Router } from '@angular/router';
import { ClientsService } from 'src/app/services/clients.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-modal-info',
  templateUrl: './modal-info.component.html',
  styleUrls: ['./modal-info.component.scss'],
})
export class ModalInfoComponent implements OnInit {

  @ViewChild(IonModal) modal!: IonModal;
  @ViewChild('modalRequest', { static: true }) modalRequest!: IonModal;
  @ViewChild('modalClient', { static: true }) modalClient!: IonModal;
  @ViewChild('deleteModal', { static: true }) deleteModal!: IonModal;
  @Output() close = new EventEmitter<void>();

  private router = inject(Router);
  private clientsService = inject(ClientsService);
  private notificationService = inject(NotificationService);

  client: any;

  buttons = [
    { Icon: 'cotizar', Url: '/main/clients/service-request' },
    { Icon: 'historial', Url: '/quote' },
    { Icon: 'editar', Url: '/quote' },
  ];

  ngOnInit() {

  }

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

  openClientModal(clienteID: number) { // Método para abrir el modal de clientes
    this.clientsService.getClientById(clienteID).subscribe(client => {
      this.client = client.datos;
      console.log('Cliente:', this.client);
      this.modalClient.present();
    });
  }

  openDeleteModal() {
    this.modalClient.dismiss();
    this.deleteModal.present();
  }

  cancel() {
    this.deleteModal.dismiss();
  }

  deleteClient() {
    const clienteID = this.client.clienteID;
    this.clientsService.deleteClient(clienteID).subscribe( response => {
      if (response.estatus) {
        this.notificationService.presentToast(response.mensaje, 'top', 'success');
        this.deleteModal.dismiss();
        this.clientsService.updateClientsList();
        this.router.navigate(['/main/clients']);
      }
    })
  }
  
}