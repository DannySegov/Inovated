import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ExecutionsService } from 'src/app/services/executions.service';
import { NotificationService } from 'src/app/services/notification.service';
import { Image } from 'src/app/shared/interfaces/quote';

@Component({
  selector: 'app-register-installation',
  templateUrl: './register-installation.page.html',
  styleUrls: ['./register-installation.page.scss'],
})
export class RegisterInstallationPage implements OnInit {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private executionsService = inject(ExecutionsService);
  private notificationService = inject(NotificationService);
  imagesUprising: any[] = [];
  selectedImage!: string; 
  selectedExecution: any;
  
  public Servicio: string = '';
  public Clave: string = '';
  public Categoria: string = '';
  public Fecha: string = '';
  public Hora: string = '';
  public Descripcion: string = '';
  public FechaLevantamiento: string = '';
  public HoraLevantamiento: string = '';
  public InfoLevantamiento: string = '';
  public ObservacionesAdic: string = '';

  public executionForm: FormGroup = this.fb.group({
    instalacionCorrecta: [false, Validators.required],
    observaciones: ['', Validators.required],
});

  constructor() { }

  ngOnInit() {
    this.getExecutionById();
  }

  getExecutionById() {
    this.executionsService.currentExecution.subscribe(execution => {
      this.selectedExecution = execution;
      console.log('Datos ejecucion en otro componente:', this.selectedExecution);
      if (this.selectedExecution) {
        this.Servicio = this.selectedExecution.infoServicio.nombreServicio;
        this.Clave = this.selectedExecution.infoServicio.claveServicio;
        this.Categoria = this.selectedExecution.infoServicio.categoria;
        this.Descripcion = this.selectedExecution.infoServicio.descripcion;
        this.FechaLevantamiento = this.selectedExecution.levantamiento.fechaInstalacion;
        this.HoraLevantamiento = this.selectedExecution.levantamiento.horaInstalacion;
        this.InfoLevantamiento = this.selectedExecution.levantamiento.resumenLevantamiento;
        this.ObservacionesAdic = this.selectedExecution.levantamiento.observaciones;
  
        if (this.selectedExecution.levantamiento.imagenes) {
          this.imagesUprising = this.selectedExecution.levantamiento.imagenes.map((img: Image) => ({
            name: `Imagen ${img.imagenID}`,
            url: img.imagen,
            imagenID: img.imagenID,
            imagen: img.imagen
          }));
        }
      }
    });
  }

  addExecution() {
    const executionData = this.executionForm.value;
    const levantamientoID = this.selectedExecution.levantamiento.levantamientoID;
    this.executionsService.addExecution(levantamientoID, executionData).subscribe(response => {
      console.log('Ejecución agregada:', response);
      if (response) {
        this.notificationService.presentToast(response.mensaje, 'top', 'success');
        this.executionsService.updateExecutionsList();
        this.router.navigate(['/main/executions']);
      } else {
        this.notificationService.presentToast('Ocurrió un error al agregar la cotización.', 'top', 'danger');
      }
    });
  }

}
