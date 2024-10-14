import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.page.html',
  styleUrls: ['./edit-service.page.scss'],
})
export class EditServicePage implements OnInit {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private servicesService = inject(ServicesService);
  private notificationService = inject(NotificationService);  
  servicioOfreceID!: number;

  constructor() { }

  public editServiceForm: FormGroup = this.fb.group({
    nombreServicio: ['', [Validators.required]],
    claveServicio: ['', [Validators.required]],
    categoria: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
    servicioOfreceID: 0
  });

  ngOnInit() {
    this.servicesService.currentServicioOfreceID.subscribe(id => {
      if (id !== null) {
        this.servicioOfreceID = id;
        console.log('Recibido en otro componente:', this.servicioOfreceID);
        this.getServiceById(this.servicioOfreceID);
      }
    });
  }

  getServiceById(servicioOfreceID: number) {
    this.servicesService.getServiceById(servicioOfreceID).subscribe(service => {
      this.editServiceForm.patchValue({
        nombreServicio: service.datos.nombreServicio,
        claveServicio: service.datos.claveServicio,
        categoria: service.datos.categoria,
        descripcion: service.datos.descripcion,
        servicioOfreceID: service.datos.servicioOfreceID
      });
    });
  }

  editService() {
    const dataService = this.editServiceForm.value;
    this.servicesService.updateService(this.servicioOfreceID, dataService).subscribe(response => {
      this.notificationService.presentToast(response.mensaje, 'top', 'success');
      this.router.navigate(['/main/services']);
    });
  }

}