import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { ServiceRequerimentsService } from 'src/app/services/service-requeriments.service';
import { ClientsService } from 'src/app/services/clients.service';
import { ServiceRequeriments } from 'src/app/shared/interfaces/services';


@Component({
  selector: 'app-service-request',
  templateUrl: './service-request.page.html',
  styleUrls: ['./service-request.page.scss'],
})
export class ServiceRequestPage implements OnInit {

  @ViewChild('dateModal') dateModal: any;
  @ViewChild('timeModal') timeModal: any;

  private serviceRequeriment = inject(ServiceRequerimentsService);
  private clientService = inject(ClientsService);
  private fb = inject(FormBuilder);
  
  public services: any;
  public selectedDate: string = 'dd / mm / aaaa';
  public selectedTime: string = '12:00 pm'; 
  public clienteID: number = 0;

  public serviceRequestForm: FormGroup = this.fb.group({
    descripcion: ['', [Validators.required]],
    fecha: ['', [Validators.required]], 
    hora: ['', [Validators.required]], 
    servicioOfreceID: ['0', [Validators.required, Validators.pattern(/^(?!0$).*$/)]],
  });

  constructor() { }

  ngOnInit() {
    this.serviceRequeriments();
    this.getClientID();
  }

  serviceRequeriments(): void { // Método para obtener los servicios
    this.serviceRequeriment.getServiceRequeriments().subscribe({
      next: (response) => {
        this.services = response; 
        console.log(response);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  onDateChange(event: any) { // Método para cambiar la fecha
    const selectedDate = new Date(event.detail.value);
    const formattedDate = formatDate(selectedDate, 'yyyy-MM-dd', 'en-US');
    this.serviceRequestForm.patchValue({ fecha: formattedDate });
    this.selectedDate = formattedDate;
    this.dateModal.dismiss();
  }

  onTimeChange(event: any) { // Método para cambiar la hora
    const dateValue = event.detail.value;
    if (dateValue) {
        const date = new Date(dateValue);
        if (!isNaN(date.getTime())) {
            const hours = String(date.getUTCHours()).padStart(2, '0');
            const minutes = String(date.getUTCMinutes()).padStart(2, '0');
            const seconds = String(date.getUTCSeconds()).padStart(2, '0');
            const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');
            const formattedTime = `${hours}:${minutes}:${seconds}.${milliseconds}`;
            
            this.serviceRequestForm.patchValue({ hora: formattedTime });
            this.selectedTime = formattedTime;
        } else {
            console.error('Fecha inválida:', this.selectedTime);
        }
    } else {
        console.error('Valor de evento inválido:', event);
    }
}

saveTime() { // Método para guardar la hora seleccionada
    console.log('Hora guardada:', this.selectedTime);
    this.serviceRequestForm.patchValue({ hora: this.selectedTime });
    this.timeModal.dismiss();
}

  getClientID(){ // Método para obtener el ID del cliente
    this.clientService.clienteID$.subscribe(clienteID => {
      this.clienteID = clienteID;
      console.log('Cliente ID recibido en otro componente:', this.clienteID);
    });
  }

  sendRequest() { // Método para enviar la solicitud de servicio
    const request: ServiceRequeriments = this.serviceRequestForm.value;
    this.serviceRequeriment.addServiceRequeriments(this.clienteID, request).subscribe({
      next: (response) => {
        console.log(response);
        console.log('Formulario enviado');
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  logFormValues() { // Método para imprimir en consola los valores del formulario
    console.log(this.serviceRequestForm.value);
  }

}