import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-new-service',
  templateUrl: './new-service.page.html',
  styleUrls: ['./new-service.page.scss'],
})
export class NewServicePage implements OnInit {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private servicesService = inject(ServicesService);
  private notificationService = inject(NotificationService);  

  constructor() { }

  public newServiceForm: FormGroup = this.fb.group({
    nombreServicio: ['', [Validators.required]],
    claveServicio: ['', [Validators.required]],
    categoria: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
    servicioOfreceID: 0
  })

  ngOnInit() {
  }

  addService() {
    const dataService = this.newServiceForm.value;
    this.servicesService.addService(dataService).subscribe(response => {
      this.notificationService.presentToast(response.mensaje, 'top', 'success');
      this.servicesService.updateServicesList();
      this.router.navigate(['/main/services']);
    });
  }
}
