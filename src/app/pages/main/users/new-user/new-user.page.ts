import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DepartmentsService } from 'src/app/services/departments.service';
import { JobsService } from 'src/app/services/jobs.service';
import { UsersService } from 'src/app/services/users.service';
import { NotificationService } from 'src/app/services/notification.service';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.page.html',
  styleUrls: ['./new-user.page.scss'],
})
export class NewUserPage implements OnInit {

  @ViewChild('departmentModal') departmentModal: any;
  @ViewChild('jobModal') jobModal: any;
  @ViewChild('dateModal') dateModal: any;

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private usersService = inject(UsersService);
  private departementsService = inject(DepartmentsService);
  private jobsService = inject(JobsService);
  private notificationService = inject(NotificationService);

  public selectedDate: string = 'dd / mm / aaaa';
  public departments: any;
  public jobs: any;
  public selectedDepartmentName: string = 'Selecciona una opción';
  public selectedJobName: string = 'Selecciona una opción';
  public selectedDepartments: any[] = [];
  public lastSelectedDepartment: any;
  public selectedJobs: any[] = [];
  public lastSelectedJob: any;
  public selectedContacts: any[] = [];

  constructor() { }

  public newUserForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]], 
    paterno: ['', [Validators.required]], 
    correo: ['', [Validators.required, Validators.email]], 
    fechaNacimiento: ['', [Validators.required]], 
    password: ['', [Validators.required]],
    materno: ['', [Validators.required]],
    telefono:  ['', [Validators.required]],
    perfil: this.fb.group({
      puestoID: [0, [Validators.required]],
      departamentoID: [0, [Validators.required]]
    }),
    direccion: this.fb.group({
      calle: ['', [Validators.required]],
      numeroExterior: ['', [Validators.required]],
      colonia: ['', [Validators.required]],
      codigoPostal: ['', [Validators.required]],
      ciudad: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      direccionID: null,
      numeroInterior: ['', [Validators.required]],
    }),
    contactos: this.fb.array([])
  });

  public tempContactForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]],
    telefono:  ['', [Validators.required]],
    correo: ['', [Validators.required]],
    contactoID: null
  });

  ngOnInit() {
    this.getDepartments();
    this.getJobs();
  }

  onDateChange(event: any) {
    const selectedDate = new Date(event.detail.value);
    const formattedDate = formatDate(selectedDate, 'yyyy-MM-dd', 'en-US');
    this.newUserForm.patchValue({ fechaNacimiento: formattedDate });
    this.selectedDate = formattedDate;
    this.dateModal.dismiss();
  }

  get contactos(): FormArray {
    return this.newUserForm.get('contactos') as FormArray;
  }

  agregarContacto() {
    this.contactos.push(this.fb.group(this.tempContactForm.value));
    this.selectedContacts.push(this.tempContactForm.value);
    this.tempContactForm.reset();
    console.log('Contacto agregado:', this.selectedContacts);
  }

  deleteContact(contact: any) { 
    // Eliminar el contacto del FormArray
    const contactosArray = this.contactos;
    const index = contactosArray.controls.findIndex((ctrl) => ctrl.value.contactoID === contact.contactoID);
    if (index !== -1) {
      contactosArray.removeAt(index);
    }

    // Eliminar el contacto del estado local
    this.selectedContacts = this.selectedContacts.filter(c => c.contactoID !== contact.contactoID);
    console.log('Contacto eliminado:', this.selectedContacts);
  }

  editContact(contact: any) {
    this.tempContactForm.patchValue(contact);
    this.deleteContact(contact);
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

  selectDepartment(department: any) {
    const index = this.selectedDepartments.findIndex(srv => srv.puestoID === department.departamentoID);
    if (index === -1) {
      this.selectedDepartments.push(department);
    } else {
      this.selectedDepartments.splice(index, 1);
    }
    this.lastSelectedDepartment = department;
    console.log('Departamento seleccionado:', department);
    this.updateSelectedDepartmentName();
    this.newUserForm.patchValue({ perfil: { departamentoID: department.departamentoID } });
    this.departmentModal.dismiss();
    console.log('Servicio seleccionado ID:', department.departamentoID);
  }

  updateSelectedDepartmentName() {
    if (this.selectedDepartments.length > 0) {
      this.selectedDepartmentName = this.selectedDepartments.map(department => department.nombre).join(', ');
    } else {
      this.selectedDepartmentName = 'Selecciona una opción';
    }
  }

  selectJob(job: any) {
    const index = this.selectedJobs.findIndex(j => j.puestoID === job.puestoID);
    if (index === -1) {
      this.selectedJobs.push(job);
    } else {
      this.selectedJobs.splice(index, 1);
    }
    this.lastSelectedJob = job;
    console.log('Puesto seleccionado:', job);
    this.updateSelectedJobName();
    this.newUserForm.patchValue({ perfil: { puestoID: job.puestoID } });
    this.jobModal.dismiss();
    console.log('Puesto ID:', job.puestoID);
  }

  getJobs() {
    this.jobsService.getJobs().subscribe({
      next: (response) => {
        this.jobs = response.datos;
        console.log('Puestos:', this.jobs);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  updateSelectedJobName() {
    if (this.selectedJobs.length > 0) {
      this.selectedJobName = this.selectedJobs.map(job => job.nombre).join(', ');
    } else {
      this.selectedJobName = 'Selecciona una opción';
    }
  }

  addNewUser() {
    const dataNewUser = this.newUserForm.value;
    this.usersService.addUsers(dataNewUser).subscribe((response): void => {
      this.notificationService.presentToast(response.mensaje, 'top', 'success');
      this.usersService.updateUsersList();
      this.router.navigate(['/main/users']);
    })
  }
}