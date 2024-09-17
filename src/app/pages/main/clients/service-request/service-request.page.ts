import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientsService } from 'src/app/services/clients.service';
import { ServiceRequerimentsService } from 'src/app/services/service-requeriments.service';
import { ServiceRequeriments } from 'src/app/shared/interfaces/services';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-service-request',
  templateUrl: './service-request.page.html',
  styleUrls: ['./service-request.page.scss'],
})
export class ServiceRequestPage implements OnInit {

  private serviceRequeriment = inject(ServiceRequerimentsService);
  private clientService = inject(ClientsService);
  private fb = inject(FormBuilder);
  public services: any;
  @ViewChild('dateModal') dateModal: any;
  @ViewChild('timeModal') timeModal: any;
  public selectedDate: string = 'dd / mm / aaaa';
  public selectedTime: string = '12:00 pm'; // Valor inicial
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

  serviceRequeriments(): void {
    this.serviceRequeriment.getServiceRequeriments().subscribe({
      next: (response) => {
        this.services = response; // Guardar la respuesta en la variable services
        console.log(response);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  onDateChange(event: any) {
    const selectedDate = new Date(event.detail.value);
    const formattedDate = formatDate(selectedDate, 'yyyy-MM-dd', 'en-US');
    this.serviceRequestForm.patchValue({ fecha: formattedDate });
    this.selectedDate = formattedDate;
    this.dateModal.dismiss();
  }



  onTimeChange(event: any) {
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

saveTime() {
    // Aquí puedes agregar lógica adicional si es necesario
    console.log('Hora guardada:', this.selectedTime);
    this.serviceRequestForm.patchValue({ hora: this.selectedTime });
    this.timeModal.dismiss();
}

  getClientID(){
    // Aquí puedes agregar lógica adicional si es necesario
    this.clientService.clienteID$.subscribe(clienteID => {
      this.clienteID = clienteID;
      console.log('Cliente ID recibido en otro componente:', this.clienteID);
    });
  }

  sendRequest() {
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

  logFormValues() {
    console.log(this.serviceRequestForm.value);
  }

}