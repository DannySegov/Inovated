import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ServicesService } from 'src/app/services/services.service';
import { ModalInfoServiceComponent } from 'src/app/shared/components/modal-info-service/modal-info-service.component';
import { ServicioRequerimentsResponse } from 'src/app/shared/interfaces/services';

@Component({
  selector: 'app-services',
  templateUrl: './services.page.html',
  styleUrls: ['./services.page.scss'],
})
export class ServicesPage implements OnInit {
  private servicesService = inject(ServicesService);

  @ViewChild(ModalInfoServiceComponent) modalInfoServiceComponent!: ModalInfoServiceComponent;
  public services: ServicioRequerimentsResponse[] = [];
  

  constructor() { }

  ngOnInit() {
    this.servicesService.services$.subscribe(services => {
      this.services = services;
    });
    this.getServices();
  }

  getServices() {
    this.servicesService.getServices(10, 1).subscribe({
      next: (response: any) => {
        if (response.estatus) {
          this.services = response.datos;
          console.log('Services', response.datos);
        } else {
          console.error('Error al recuperar los datos de los servicios:', response.mensaje);
        }
      },
      error: (error) => {
        console.error('Error en la llamada al servicio de servicios:', error);
      }
    });
  }

  openServiceModal(service: any) {
    this.modalInfoServiceComponent.openUprisingModal(service.servicioOfreceID);
    this.servicesService.changeData(service); // Enviar datos al servicio
  }

}
