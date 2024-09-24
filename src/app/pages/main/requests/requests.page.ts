import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { RequestsService } from 'src/app/services/requests.service';
import { ModalInfoRequestComponent } from 'src/app/shared/components/modal-info-request/modal-info-request.component';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.page.html',
  styleUrls: ['./requests.page.scss'],
})
export class RequestsPage implements OnInit {

  private requestsService = inject(RequestsService);
  @ViewChild(ModalInfoRequestComponent) modalInfoRequestComponent!: ModalInfoRequestComponent;
  public requests: any[] = [];

  constructor() { }

  ngOnInit() {
    this.requestsService.requests$.subscribe(requests => {
      this.requests = requests;
    });

    // Actualizar la lista de solicitudes al iniciar el componente
    this.requestsService.updateRequestsList();
  }

  getRequests() { // Método para obtener las solicitudes de servicio
    this.requestsService.getRequests(10, 1).subscribe({
      next: (response: any) => {
        if (response.estatus) {
          this.requests = response.datos.map((request: any) => {
            console.log('Request', request);
            return request;
          });
        } else {
          console.error('Error al recuperar los datos de los clientes:', response.mensaje);
        }
      },
      error: (error) => {
        console.error('Error en la llamada al servicio de clientes:', error);
      }
    });
  }

  openRequestModal(request: any) { // Método para abrir el modal de información del cliente 
    this.modalInfoRequestComponent.openRequestModal(request.servicioID);
    console.log('Solicitud seleccionada:', request.servicioID);
  }
}