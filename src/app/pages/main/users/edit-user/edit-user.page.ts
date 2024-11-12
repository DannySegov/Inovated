import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DepartmentsService } from 'src/app/services/departments.service';
import { JobsService } from 'src/app/services/jobs.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.page.html',
  styleUrls: ['./edit-user.page.scss'],
})
export class EditUserPage implements OnInit {
  @ViewChild('departmentModal') departmentModal: any;
  @ViewChild('jobModal') jobModal: any;
  @ViewChild('dateModal') dateModal: any;
  
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private usersService = inject(UsersService);
  public departmentsService = inject(DepartmentsService);
  private jobsService = inject(JobsService);
  private notificationService = inject(NotificationService); 

  userID!: number;  
  selectedDate: string = 'dd / mm / aaaa';
  public selectedDepartmentName: string = 'Selecciona una opción';
  public selectedDepartments: any[] = [];
  public lastSelectedDepartment: any;
  public departments: any;
  public jobs: any;
  public selectedJobName: any = 'Selecciona una opción';
  public selectedJobs: any[] = [];
  public lastSelectedJob: any;
  public selectedContacts: any[] = [];
  public listaContactos: any;

  constructor() { }

  public newUserForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]],
    paterno: ['', [Validators.required]],
    correo: ['', [Validators.required, Validators.email]],
    fechaNacimiento: ['', [Validators.required]],
    password: 'gfdgdrfffd',
    materno: ['', [Validators.required]],
    telefono: '35672890987',
    perfil: this.fb.group({
      puestoID: [0, [Validators.required]]
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
    telefono: ['', [Validators.required]],
    correo: ['', [Validators.required]],
    contactoID: null
  });

  ngOnInit() {
    this.usersService.currentUserID.subscribe(id => {
      if (id !== null) {
        this.userID = id;
        console.log('Recibido en otro componente:', this.userID);
        this.getUserById(this.userID);
      }
    });

    //this.getJobs();
  }

  editUser() {
    const dataUser = this.newUserForm.value;
    this.usersService.updateUser(this.userID, dataUser).subscribe(response => {
      this.notificationService.presentToast(response.mensaje, 'top', 'success');
      this.usersService.updateUsersList();
      this.router.navigate(['/main/users']);
    });
  }

  /*
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
    */

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
/*
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
    */

  getUserById(id: number) {
    this.usersService.getUserById(id).subscribe(user => {
      this.listaContactos = user.datos.contactos;
      console.log('Contactos:', this.listaContactos); 
      this.newUserForm.patchValue({
        nombre: user.datos.nombre,
        paterno: user.datos.paterno,
        correo: user.datos.correo,
        fechaNacimiento: user.datos.fechaNacimiento,
        password: user.datos.password,
        materno: user.datos.materno,
        telefono: user.datos.telefono,
        perfil: {
          puestoID: user.datos.perfil?.puestoID
        },
        direccion: {
          calle: user.datos.direccion.calle,
          numeroExterior: user.datos.direccion.numeroExterior,
          colonia: user.datos.direccion.colonia,
          codigoPostal: user.datos.direccion.codigoPostal,
          ciudad: user.datos.direccion.ciudad,
          estado: user.datos.direccion.estado,
          direccionID: user.datos.direccion.direccionID,
          numeroInterior: user.datos.direccion.numeroInterior
        }
      });
  
      // Limpiar el FormArray de contactos antes de agregar nuevos contactos
      this.contactos.clear();
  
      // Asegurarse de que user.datos.contactos sea un array
      const contactosArray = Array.isArray(user.datos.contactos) ? user.datos.contactos : [user.datos.contactos];
  
      // Generar tarjetas de contacto
      this.generateContactCards(contactosArray);
  
      this.selectedDate = this.formatDate(user.datos.fechaNacimiento);
      this.setSelectedJobName(user.datos.perfil?.puestoID); // Asignar el nombre del puesto
    });
  }

  generateContactCards(contactos: any[]) {
    contactos.forEach((contacto: any) => {
      const contactoForm = this.fb.group({
        nombre: [contacto.nombre, [Validators.required]],
        telefono: [contacto.telefono, [Validators.required]],
        correo: [contacto.correo, [Validators.required]],
        contactoID: contacto.contactoID
      });
      this.contactos.push(contactoForm);
      this.selectedContacts.push(contacto);
    });
  }

  setSelectedJobName(puestoID: any) {
    const job = this.jobs.find((job: any) => job.puestoID === puestoID);
    if (job) {
      this.selectedJobName = job.nombre;
    } else {
      this.selectedJobName = 'Selecciona una opción';
    }
  }

  onDateChange(event: any) {
    const selectedDate = new Date(event.detail.value);
    const formattedDate = `${selectedDate.getDate()} / ${selectedDate.getMonth() + 1} / ${selectedDate.getFullYear()}`;
    this.newUserForm.patchValue({ fechaNacimiento: formattedDate });
    this.selectedDate = formattedDate;
    this.dateModal.dismiss();
  }

  private formatDate(dateString: string): string {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }

  selectJob(job: any) {
    const index = this.selectedJobs.findIndex(j => j.puestoID === job.puestoID);
    if (index === -1) {
      this.selectedJobs.push(job);
    } else {
      this.selectedJobs.splice(index, 1);
    }
    this.lastSelectedJob = job;
    console.log('Puesto seleccionado:', this.selectedJobs);
    this.updateSelectedJobName();
    this.newUserForm.patchValue({ perfil: { puestoID: job.puestoID } });
    this.jobModal.dismiss();
    console.log('Puesto ID:', job.puestoID);
  }

  updateSelectedJobName() {
    if (this.selectedJobs.length > 0) {
      this.selectedJobName = this.selectedJobs.map(job => job.nombre).join(', ');
    } else {
      this.selectedJobName = 'Selecciona una opción';
    }
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

  editContact(contact: any) {
    this.tempContactForm.patchValue(contact);
    this.deleteContact(contact);
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
}