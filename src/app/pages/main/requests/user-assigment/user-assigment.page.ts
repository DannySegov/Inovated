import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { RequestsService } from 'src/app/services/requests.service';
import { UsersService } from 'src/app/services/users.service';
import { ResponseAdd } from 'src/app/shared/interfaces/clients';
import { Employee } from 'src/app/shared/interfaces/requests';

@Component({
  selector: 'app-user-assigment',
  templateUrl: './user-assigment.page.html',
  styleUrls: ['./user-assigment.page.scss'],
})
export class UserAssigmentPage implements OnInit {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private requestsService = inject(RequestsService);
  private userService = inject(UsersService);
  private notificationService = inject(NotificationService);  

  @ViewChild('employeeModal') employeeModal: any;

  public request: any; 
  public employees: Employee[] = [];
  public selectedEmployeeName: string = 'Selecciona una opción';
  public selectedEmployees: Employee[] = [];
  public lastSelectedEmployee: Employee | null = null;

  public userAssigmentForm: FormGroup = this.fb.group({
    servicio: [{ value: '', disabled: true }],
    clave: [{ value: '', disabled: true }],
    categoria: [{ value: '', disabled: true }],
    fecha: [{ value: '', disabled: true }],
    hora: [{ value: '', disabled: true }],
    descripcion: [{ value: '', disabled: true }]
  });

  constructor() { }

  ngOnInit() {
    this.getRequestById();
    this.getEmployees();
  }

  // Método para obtener la solicitud de servicio por ID
  getRequestById() {
    this.requestsService.currentRequest.subscribe(request => {
      if (request) {
        this.request = request;
        console.log('Id recibido en user assigment:', request);

        this.userAssigmentForm.patchValue({
          servicio: request.infoServicio.nombreServicio,
          clave: request.infoServicio.claveServicio,
          categoria: request.infoServicio.categoria,
          fecha: request.fecha,
          hora: request.hora,
          descripcion: request.descripcion
        });
      }
    });
  }

  // Método para obtener la lista de empleados
  getEmployees() {
    this.requestsService.getEmployees().subscribe(response => {
      if (response) {
        this.employees = response;
        console.log('Empleados:', this.employees);
      }
    });
  }

  // Método para abrir el modal de empleados
  selectEmployee(employee: Employee) {
    const index = this.selectedEmployees.findIndex(emp => emp.empleadoID === employee.empleadoID);
    if (index === -1) {
      this.selectedEmployees.push(employee);
    } else {
      this.selectedEmployees.splice(index, 1);
    }
    this.lastSelectedEmployee = employee;
    this.updateSelectedEmployeeName();
    this.employeeModal.dismiss();
    console.log('Empleado seleccionado ID:', employee.empleadoID);
  }

  // Método para actualizar el nombre del empleado seleccionado
  updateSelectedEmployeeName() {
    if (this.lastSelectedEmployee) {
      this.selectedEmployeeName = this.lastSelectedEmployee.nombreCompleto;
    } else {
      this.selectedEmployeeName = 'Selecciona una opción';
    }
  }

  // Método para eliminar un empleado
  deleteEmployee(employee: Employee) {
    const usuarioID = employee.id;
    console.log('ID Empleado a eliminar:', usuarioID);
    this.userService.deleteUser(usuarioID).subscribe(response => {
      if (response.estatus) {
        this.notificationService.presentToast(response.mensaje, 'top', 'success');
        // Eliminar el empleado de la lista selectedEmployees
        this.selectedEmployees = this.selectedEmployees.filter(e => e.id !== usuarioID);
        this.selectedEmployeeName = 'Selecciona una opción';
      } 
    });
  }

// Método para asignar empleados a la solicitud de servicio
assignEmployeeToRequest(servicioID: number): void {
  const empleados = this.selectedEmployees.map(emp => emp.empleadoID); // Extrae los IDs de los empleados seleccionados

  console.log('Servicio ID:', servicioID);
  console.log('Empleados:', empleados);

  if (empleados.length === 0) {
    console.error('No hay empleados seleccionados.');
    return;
  }

  this.requestsService.assignEmployeeToRequest(servicioID, empleados).subscribe({
    next: (response: ResponseAdd) => {
      console.log(response.mensaje);
      this.notificationService.presentToast(response.mensaje, 'top', 'success');
      this.router.navigateByUrl('/main/requests');
     //console.log('Empleados asignados exitosamente:', response);
    },
    error: (error) => {
      console.error('Error al asignar empleados:', error);
    }
  });
}
}