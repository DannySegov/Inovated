import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DepartmentsService } from 'src/app/services/departments.service';
import { JobsService } from 'src/app/services/jobs.service';
import { Department } from 'src/app/shared/interfaces/departments';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.page.html',
  styleUrls: ['./new-user.page.scss'],
})
export class NewUserPage implements OnInit {

  private fb = inject(FormBuilder);
  private departementsService = inject(DepartmentsService);
  private jobsService = inject(JobsService);

  public selectedDate: string = 'dd / mm / aaaa';
  public departments: any;
  public selectedDepartmentName: string = 'Selecciona una opción';

  constructor() { }

  public newUserForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]],
    paterno: ['', [Validators.required]],
    materno: ['', [Validators.required]],
    fechaNacimiento: ['', [Validators.required]],
    correo: ['', [Validators.required, Validators.email]],
    telefono: ['', [Validators.required]],
    departamento: ['', [Validators.required]],
    puesto: ['', [Validators.required]],
    direccion: this.fb.group({
      calle: ['', [Validators.required]],
      numeroExterior: ['', [Validators.required]],
      numeroInterior: ['', [Validators.required]],
      colonia: ['', [Validators.required]],
      codigoPostal: ['', [Validators.required]],
      ciudad: ['', [Validators.required]],
      estado: ['', [Validators.required]]
    }),
    contactosAdicionales: this.fb.array([]) // Inicializa como un array vacío
  });

  ngOnInit() {
    this.getDepartments();
    this.getJobs();
  }

  getDepartments(): void {
    this.departementsService.getDepartments().subscribe({
      next: (response) => {
        this.departments = response.datos; 
        console.log('Departamentos:', this.departments);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  getJobs() {
    this.jobsService.getJobs().subscribe({
      next: (response) => {
        console.log('Puestos:', response);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
