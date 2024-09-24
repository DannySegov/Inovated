import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { RequestsService } from 'src/app/services/requests.service';
import { ModalInfoRequestComponent } from 'src/app/shared/components/modal-info-request/modal-info-request.component';
import { ModalInfoComponent } from 'src/app/shared/components/modal-info/modal-info.component';
@Component({
  selector: 'app-requests',
  templateUrl: './requests.page.html',
  styleUrls: ['./requests.page.scss'],
})
export class RequestsPage implements OnInit {
  
  private requestsService = inject(RequestsService);
  @ViewChild(ModalInfoRequestComponent) modalInfoRequestComponent!: ModalInfoRequestComponent;
  public requests: any[] = [];

  clients = [
    { id: 1, name: 'Obed Jimenez Mendoza', address: 'Paseo de los Gavilanes #132-A', color: '#b9cb2d' },
    { id: 2, name: 'Sebastian Bolaños', address: 'Grabadores de Aurora #112', color: '#f95252' },
    { id: 3, name: 'Esteban Ortiz Villalpando', address: 'Eilat #1506 in 202 Los Angeles', color: '#0092d1' },
    { id: 4, name: 'Diana Sanchez', address: 'Palo cuarto #117 El coecillo', color: '#d31e3c' },
    { id: 5, name: 'Guillermo Carranza', address: 'Pueblo Nuevo #122 San Pedro', color: '#17a9bf' },
    { id: 6, name: 'Diana Victoria Guerrero', address: 'Xichu #106 Moderna, León', color: '#0d3d57' },
  ];

  constructor() { }

  ngOnInit() {
    this.getRequests();
    this.requestsService.requests$.subscribe(requests => {
      this.requests = this.requests;
    });

    // Actualizar la lista de clientes al iniciar el componente
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
