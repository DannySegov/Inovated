import { computed, inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DataDepartment, DepartmentResponse } from '../shared/interfaces/departments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ResponseAdd } from '../shared/interfaces/clients';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {
  private http = inject(HttpClient);

  private readonly baseUrl: string = environment.baseUrl;
  private readonly headers: HttpHeaders = new HttpHeaders().set('Authorization', `Bearer ${this.accessToken}`);

  #department = signal<any>({
    departments: []
  });

  #listDepartments = signal<any>({
    listDepartments: []
  });
  

  public departments = computed(() => this.#department().departments);
  public listDepartments = computed(() => this.#listDepartments().listDepartments);

  constructor() {
    this.getDepartments(); // Llamar al método para obtener los departamentos al inicializar el servicio
    this.getListDepartments();
  }

  getDepartments() { // Obtener Departamentos
    this.http.get<DepartmentResponse>(`${this.baseUrl}/accesos/departamentos/`, { headers: this.headers })
      .subscribe(response => {
        this.#department.set({
          departments: response.datos
        });
      });
  }
  
  getListDepartments() { // Obtener Departamentos
    this.http.get<DepartmentResponse>(`${this.baseUrl}/accesos/departamentos/info-basica`, { headers: this.headers })
      .subscribe(response => {
        this.#listDepartments.set({
          listDepartments: response.datos
        });
      });
  }

  getDepartmentById(departamentoID: number): Observable<DepartmentResponse> {
    return this.http.get<DepartmentResponse>(`${this.baseUrl}/accesos/departamentos/info-departamento/${departamentoID}`, { headers: this.headers });
  }

  addDepartments(dataDepartment: DataDepartment): Observable<ResponseAdd> { // Crear Departamento
    return this.http.post<ResponseAdd>(`${this.baseUrl}/accesos/departamentos`, dataDepartment, { headers: this.headers })
      .pipe(
        tap(response => {
          console.log( response); 
          // Actualizar el signal con el nuevo departamento
          this.#department.update(departmentsState => ({
            departments: [...departmentsState.departments, dataDepartment]
          }));
        })
      );
  }

  updateDepartments(departamentoID: number, dataDepartment: DataDepartment): Observable<ResponseAdd> { // Actualizar Departamento
    return this.http.put<ResponseAdd>(`${this.baseUrl}/accesos/departamentos/${departamentoID}`, dataDepartment, { headers: this.headers })
    .pipe(
      tap(response => {
        console.log(response); 
        // Actualizar el signal con el departamento actualizado
        this.#department.update(departmentsState => ({
          departments: departmentsState.departments.map((department: DataDepartment) => 
            department.departamentoID === departamentoID ? dataDepartment : department
          )
        }));
      })
    );
  }

  get accessToken(): string | null { // Método para obtener el token de acceso
    return localStorage.getItem('access');
  }
}