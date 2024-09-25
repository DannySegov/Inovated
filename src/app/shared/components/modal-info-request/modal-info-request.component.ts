import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { NotificationService } from 'src/app/services/notification.service';
import { RequestsService } from 'src/app/services/requests.service';

@Component({
  selector: 'app-modal-info-request',
  templateUrl: './modal-info-request.component.html',
  styleUrls: ['./modal-info-request.component.scss'],
})
export class ModalInfoRequestComponent implements OnInit {
  
  @ViewChild(IonModal) modal!: IonModal;
  @ViewChild('modalRequest', { static: true }) modalRequest!: IonModal;
  @ViewChild('deleteModal', { static: true }) deleteModal!: IonModal;

  private router = inject(Router);
  private requestsService = inject(RequestsService);
  private notificationService = inject(NotificationService);
  public requests: any[] = [];
  public request: any; 

  constructor() { }

  ngOnInit() {}

  buttonsRequest = [
    { icon: 'asignar', label: "Asignar", url: '/main/requests/user-assigment' },
    { icon: 'editar', label: "Editar", url: '/quote' },
  ];

  openRequestModal(servicioID: number) {
    this.requestsService.getRequestById(servicioID).subscribe(request => {
      this.request = request.datos;
      this.modalRequest.present();
    });
  }

  onQuote() { 
    this.router.navigate(['/main/requests/user-assigment']);
    this.modalRequest.dismiss();
  }

  openDeleteModal() {
    this.modalRequest.dismiss();
    this.deleteModal.present();
  }

  cancel() {
    this.deleteModal.dismiss();
  }

  deleteRequest() {
    console.log('Delete', this.request); 
    const servicioID = this.request.servicioID;
    this.requestsService.deleteRequest(servicioID).subscribe(response => {
      if (response.estatus) {
        this.notificationService.presentToast(response.mensaje, 'top', 'success');
        this.deleteModal.dismiss();
        this.requestsService.updateRequestsList();
        this.router.navigate(['/main/requests']);
      } 
    });
  }
}