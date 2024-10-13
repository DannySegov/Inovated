import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { ServiceRequerimentsService } from 'src/app/services/service-requeriments.service';
import { ClientsService } from 'src/app/services/clients.service';
import { ServiceRequeriments } from 'src/app/shared/interfaces/services';
import { NotificationService } from 'src/app/services/notification.service';
import { RequestsService } from 'src/app/services/requests.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-service-request',
  templateUrl: './service-request.page.html',
  styleUrls: ['./service-request.page.scss'],
})
export class ServiceRequestPage implements OnInit {

  @ViewChild('dateModal') dateModal: any;
  @ViewChild('timeModal') timeModal: any;
  @ViewChild('employeeModal') employeeModal: any;

  private serviceRequeriment = inject(ServiceRequerimentsService);
  private clientsService = inject(ClientsService);
  private notificationService = inject(NotificationService);
  private requestsService = inject(RequestsService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  
  public client: any; 
  public services: any;
  public selectedDate: string = 'dd / mm / aaaa';
  public selectedTime: string = '12:00 pm'; 
  public selectedServiceName: string = 'Selecciona una opción';
  public clienteID: number = 0;
  public selectedRequest: any;
  public selectedServices: any[] = [];
  public lastSelectedService: any;

  timeValue!: Date;

  public serviceRequestForm: FormGroup = this.fb.group({
    descripcion: ['', [Validators.required]],
    fecha: ['', [Validators.required]], 
    hora: ['', [Validators.required]], 
    servicioOfreceID: ['0', [Validators.required, Validators.pattern(/^(?!0$).*$/)]],
  });

  constructor() { 
    this.timeValue = new Date();
  }

  ngOnInit() {
    this.getClientById();
    this.serviceRequeriments();
    this.requestsService.requests$.subscribe(requests => {
      if (requests.length > 0) {
        this.selectedRequest = requests[0];
        console.log('Solicitud seleccionada:', this.selectedRequest);
      }
    });

    this.requestsService.updateRequestsList();
  }

  serviceRequeriments(): void {
    this.serviceRequeriment.getServiceRequeriments().subscribe({
      next: (response) => {
        this.services = response; 
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
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const seconds = String(date.getSeconds()).padStart(2, '0');
            const milliseconds = String(date.getMilliseconds()).padStart(3, '0');
            const formattedTime = `${hours}:${minutes}:${seconds}.${milliseconds}`;
            
            this.serviceRequestForm.patchValue({ hora: formattedTime });
            this.selectedTime = this.formatDisplayTime(date.getHours(), date.getMinutes());
        } else {
            console.error('Fecha inválida:', this.selectedTime);
        }
    } else {
        console.error('Valor de evento inválido:', event);
    }
}

saveTime() {
    const date = new Date();
    date.setHours(this.hour, this.minute, 0, 0);
    const formattedTime = this.formatTime(date);
    this.serviceRequestForm.patchValue({ hora: formattedTime });
    this.selectedTime = this.formatDisplayTime(this.hour, this.minute);
    this.timeModal.dismiss();
}

getClientById() {
  this.clientsService.currentClient.subscribe(client => {
    if (client) {
      this.client = client;
      console.log('Clients: ', client);
      this.clienteID = client.clienteID;
      console.log('ID del cliente:', this.clienteID);
      
    }
  })
}

  sendRequest() {
    if (this.serviceRequestForm.valid) {
      const request: ServiceRequeriments = this.serviceRequestForm.value;
      console.log('Cliente ID antes de enviar la solicitud:', this.clienteID); // Añadir log para verificar clienteID
      this.serviceRequeriment.addServiceRequeriments(this.clienteID, request).subscribe({
        next: (response) => {
          this.notificationService.presentToast(response.mensaje, 'top', 'success');
          this.serviceRequestForm.reset();
          this.selectedDate = 'dd / mm / aaaa';
          this.selectedTime = '12:00 pm';
          this.router.navigate(['/main/clients']);
        },
        error: (error) => {
          console.error(error);
        }
      });
    } else {
      this.notificationService.presentToast('Formulario inválido, por favor completa todos los campos.', 'top', 'danger');
    }
  }

  selectService(service: any) {
    const index = this.selectedServices.findIndex(srv => srv.servicioOfreceID === service.servicioOfreceID);
    if (index === -1) {
      this.selectedServices.push(service);
    } else {
      this.selectedServices.splice(index, 1);
    }
    this.lastSelectedService = service;
    this.updateSelectedServiceName();
    this.serviceRequestForm.patchValue({ servicioOfreceID: service.servicioOfreceID });
    this.employeeModal.dismiss();
    console.log('Servicio seleccionado ID:', service.servicioOfreceID);
  }

  updateSelectedServiceName() {
    if (this.selectedServices.length > 0) {
      this.selectedServiceName = this.selectedServices.map(srv => srv.nombreServicio).join(', ');
    } else {
      this.selectedServiceName = 'Selecciona una opción';
    }
  }

  hour: number = 12;
  formattedHour: string = '12';
  minute: number = 0;
  formattedMinute: string = '00';
  amPm: string = 'AM';

  incrementHour() {
    if (this.hour < 12) {
      this.hour++;
    } else {
      this.hour = 1;
    }
    this.formattedHour = this.formatHour(this.hour);
    this.updateSelectedTime();
  }

  decrementHour() {
    if (this.hour > 1) {
      this.hour--;
    } else {
      this.hour = 12;
    }
    this.formattedHour = this.formatHour(this.hour);
    this.updateSelectedTime();
  }

  incrementMinute() {
    if (this.minute < 59) {
      this.minute++;
    } else {
      this.minute = 0;
    }
    this.formattedMinute = this.formatMinute(this.minute);
    this.updateSelectedTime();
  }

  decrementMinute() {
    if (this.minute > 0) {
      this.minute--;
    } else {
      this.minute = 59;
    }
    this.formattedMinute = this.formatMinute(this.minute);
    this.updateSelectedTime();
  }

  toggleAmPm() {
    this.amPm = this.amPm === 'AM' ? 'PM' : 'AM';
    this.updateSelectedTime();
  }

  formatHour(hour: number): string {
    return hour < 10 ? '0' + hour : hour.toString();
  }

  formatMinute(minute: number): string {
    return minute < 10 ? '0' + minute : minute.toString();
  }

  validateHour() {
    let hour = parseInt(this.formattedHour, 10);
    if (isNaN(hour) || hour < 1 || hour > 12) {
      hour = 12;
    }
    this.hour = hour;
    this.formattedHour = this.formatHour(this.hour);
    this.updateSelectedTime();
  }

  validateMinute() {
    let minute = parseInt(this.formattedMinute, 10);
    if (isNaN(minute) || minute < 0 || minute > 59) {
      minute = 0;
    }
    this.minute = minute;
    this.formattedMinute = this.formatMinute(this.minute);
    this.updateSelectedTime();
  }

  updateSelectedTime() {
    let hours = this.hour;
    if (this.amPm === 'PM' && this.hour !== 12) {
      hours += 12;
    } else if (this.amPm === 'AM' && this.hour === 12) {
      hours = 0;
    }
    const date = new Date();
    date.setHours(hours, this.minute, 0, 0);
    const formattedTime = this.formatTime(date);
    this.selectedTime = this.formatDisplayTime(this.hour, this.minute);
    this.serviceRequestForm.patchValue({ hora: formattedTime });
  }

  formatTime(date: Date): string {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const milliseconds = String(date.getMilliseconds()).padStart(3, '0');
    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
  }

  formatDisplayTime(hour: number, minute: number): string {
    const formattedHour = hour < 10 ? '0' + hour : hour.toString();
    const formattedMinute = minute < 10 ? '0' + minute : minute.toString();
    const amPm = this.amPm;
    return `${formattedHour}:${formattedMinute} ${amPm}`;
  }

  updateTime() {
    const hour = this.formattedHour;
    const minute = this.formattedMinute;
    const amPm = this.amPm;

    let hour24 = parseInt(hour, 10);
    if (amPm === 'PM' && hour24 < 12) {
      hour24 += 12;
    } else if (amPm === 'AM' && hour24 === 12) {
      hour24 = 0;
    }
    this.serviceRequestForm.patchValue({
      hora: `${hour24}:${minute}:00.000`
    });
  }
}