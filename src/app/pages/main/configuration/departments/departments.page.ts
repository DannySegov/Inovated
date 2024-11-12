import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { DepartmentsService } from 'src/app/services/departments.service';
import { JobsService } from 'src/app/services/jobs.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.page.html',
  styleUrls: ['./departments.page.scss'],
})
export class DepartmentsPage implements OnInit {
  private fb = inject(FormBuilder);
  public departmentsService = inject(DepartmentsService);
  public jobsService = inject(JobsService);
  private notificationService = inject(NotificationService);

  public currentDepartment = signal<any | undefined>(undefined);
  public isUpdating = signal<boolean>(false);
  selectedSegment: any = 'departamentos';
  public selectedPermissions = signal<{ [key: string]: string }>({});

  public buttonText = computed(() => this.isUpdating() ? 'Actualizar departamento' : 'Guardar departamento');
  public titleText = computed(() => this.isUpdating() ? 'Información de departamento' : 'Registrar departamento');

  constructor() { }

  public newDepartmentForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
    permisos: this.fb.array([])
  });

  ngOnInit() {
    this.newDepartmentForm.valueChanges.subscribe(() => {
      const formValues = this.newDepartmentForm.value;
      const allFieldsEmpty = !formValues.nombre && !formValues.descripcion;
      if (allFieldsEmpty) {
        this.isUpdating.set(false);
      }
    });
  }

  addDepartment() {
    const dataNewDepartment = this.newDepartmentForm.value;
    this.departmentsService.addDepartments(dataNewDepartment).subscribe((response): void => {
      console.log(response);
      this.notificationService.presentToast(response.mensaje, 'top', 'success');
    });
  }

  updateDepartment(departamentoID: number) {
    const dataDepartment = this.newDepartmentForm.value;
    this.departmentsService.updateDepartments(departamentoID, dataDepartment)
      .subscribe((response): void => {
        console.log('Actualizar', response);
        this.notificationService.presentToast(response.mensaje, 'top', 'success');
      });
  }

  getDepartmentById(departamentoID: number) {
    this.currentDepartment.set(undefined);

    this.departmentsService.getDepartmentById(departamentoID)
      .subscribe(department => {
        console.log('Departamento', department.datos);
        this.currentDepartment.set(department.datos);

        // Asumiendo que department tiene las propiedades nombre y descripcion
        this.newDepartmentForm.patchValue({
          nombre: department.datos.nombre,
          descripcion: department.datos.descripcion
        });
      });
  }

  onDepartment(departamentoID: number): void {
    console.log('Departamento ID:', departamentoID);
    this.getDepartmentById(departamentoID); // Llamada a getDepartmentById
    this.isUpdating.set(true); // Cambia a modo de actualización
  }

  // Método para manejar el envío del formulario
  onSubmit() {
    const departamentoID = this.currentDepartment()?.departamentoID;
    if (this.isUpdating() && departamentoID) {
      this.updateDepartment(departamentoID);
    } else {
      this.addDepartment();
    }
  }

  trackByPermission(index: number, permission: any): number {
    return permission.id;
  }

  onPermissionChange(permission: any, event: any) {
    const permisosArray = this.newDepartmentForm.get('permisos') as FormArray;
    const selectedPermissions = this.selectedPermissions();

    if (event.detail.value === 'true') {
      permisosArray.push(this.fb.group({
        id: [permission.id, [Validators.required]],
        descripcion: [permission.descripcion, [Validators.required]]
      }));
      selectedPermissions[permission.id] = 'true';
    } else {
      const index = permisosArray.controls.findIndex((ctrl) => ctrl.value.id === permission.id);
      if (index !== -1) {
        permisosArray.removeAt(index);
      }
      delete selectedPermissions[permission.id];
    }

    this.selectedPermissions.set(selectedPermissions);
  }
}