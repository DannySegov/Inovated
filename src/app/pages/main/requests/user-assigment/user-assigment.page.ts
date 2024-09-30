import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NotificationService } from 'src/app/services/notification.service';
import { RequestsService } from 'src/app/services/requests.service';
import { Employee } from 'src/app/shared/interfaces/requests';

@Component({
  selector: 'app-user-assigment',
  templateUrl: './user-assigment.page.html',
  styleUrls: ['./user-assigment.page.scss'],
})
export class UserAssigmentPage implements OnInit {

  private fb = inject(FormBuilder);
  private requestsService = inject(RequestsService);
  private notificationService = inject(NotificationService);  

  @ViewChild('employeeModal') employeeModal: any;

  public request: any; 
  public employees: Employee[] = [];
  public selectedEmployeeName: string = 'Selecciona una opción';
  public selectedEmployees: Employee[] = [];

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
    this.updateSelectedEmployeeName();
    this.employeeModal.dismiss();
    console.log('Empleado seleccionado ID:', employee.empleadoID);
  }

  // Método para actualizar el nombre del empleado seleccionado
  updateSelectedEmployeeName() {
    if (this.selectedEmployees.length > 0) {
      this.selectedEmployeeName = this.selectedEmployees.map(emp => emp.nombreCompleto).join(', ');
    } else {
      this.selectedEmployeeName = 'Selecciona una opción';
    }
  }

  deleteEmployee() {
    const usuarioID = this.request.id;
    this.requestsService.deleteRequest(usuarioID).subscribe(response => {
      if (response.estatus) {
        this.notificationService.presentToast(response.mensaje, 'top', 'success');
        //this.deleteModal.dismiss();
        this.updateSelectedEmployeeName();
        //this.router.navigate(['/main/requests']);
      } 
    });
  }
    
}