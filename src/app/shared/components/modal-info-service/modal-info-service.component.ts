import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { NotificationService } from 'src/app/services/notification.service';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-modal-info-service',
  templateUrl: './modal-info-service.component.html',
  styleUrls: ['./modal-info-service.component.scss'],
})
export class ModalInfoServiceComponent implements OnInit {
  private router = inject(Router);
  private serviceServices = inject(ServicesService);
  private notificationService = inject(NotificationService);

  @ViewChild('modalService', { static: true }) modalService!: IonModal;
  @ViewChild('deleteModal', { static: true }) deleteModal!: IonModal;
  
  public service: any; 
  
  constructor() { }

  ngOnInit() {}

  openUprisingModal(servicioOfreceID: number) {
    this.serviceServices.getServiceById(servicioOfreceID).subscribe(service => {
      this.service = service.datos;
      this.modalService.present();
    });
  }

  openDeleteModal() {
    this.modalService.dismiss();
    this.deleteModal.present();
  }

  openEditPage(service: any) {
    const servicioOfreceID = this.service.servicioOfreceID;
    console.log('Desde editar', servicioOfreceID);
    this.serviceServices.changeServicioOfreceID(servicioOfreceID); // Usa el servicio compartido
    this.modalService.dismiss();
    this.router.navigate(['/main/services/edit-service']);
  }

  cancel() {
    this.deleteModal.dismiss();
  }

  deleteService() {
    const servicioOfreceID = this.service.servicioOfreceID;
    this.serviceServices.deleteService(servicioOfreceID).subscribe(response => {
      if (response.estatus) {
        this.notificationService.presentToast(response.mensaje, 'top', 'success');
        this.deleteModal.dismiss();
        this.serviceServices.updateServicesList();
        this.router.navigate(['/main/services']);
      }
    });
  }
}