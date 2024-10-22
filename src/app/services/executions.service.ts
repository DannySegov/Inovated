import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AddExecution, ExecutionById, ExecutionResponse } from '../shared/interfaces/executions';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ResponseAdd } from '../shared/interfaces/clients';

@Injectable({
  providedIn: 'root'
})
export class ExecutionsService {
  private http = inject(HttpClient);

  private readonly baseUrl: string = environment.baseUrl;
  private readonly headers: HttpHeaders = new HttpHeaders().set('Authorization', `Bearer ${this.accessToken}`);

  private executionSource = new BehaviorSubject<any>(null);
  currentExecution = this.executionSource.asObservable();

  private listExecutionSource = new BehaviorSubject<any[]>([]); 
  public executions$ = this.listExecutionSource.asObservable();

  constructor() { }

  // Obtener Ejecuciones
  getExecutions(elementos: number, pagina: number): Observable<ExecutionResponse> {
    return this.http.get<ExecutionResponse>(`${this.baseUrl}/ejecuciones?elementos=${elementos}&pagina=${pagina}`, { headers: this.headers });
  }

  // Obtener Ejecución por ID
  getExecutionById(levantamientoID: number): Observable<ExecutionById> {
    return this.http.get<ExecutionById>(`${this.baseUrl}/ejecuciones/info-ejecucion/${levantamientoID}`, { headers: this.headers });
  }

  //Agregar Ejecución
  addExecution(levantamientoID: number, detail: AddExecution): Observable<ResponseAdd> {
    return this.http.post<ResponseAdd>(`${this.baseUrl}/ejecuciones/registro-instalacion/${levantamientoID}`, detail, { headers: this.headers });
  }

    // Método para actualizar la lista de ejecuciones
    updateExecutionsList() {
      this.getExecutions(10, 1).subscribe(response => {
        this.listExecutionSource.next(response.datos); // Actualizar la lista de usuarios
        console.log('Lista de ejecuciones act:', response.datos);
      });
    }

  // Método para obtener el token de acceso
  get accessToken(): string | null {
    return localStorage.getItem('access');
  }

  changeExecution(execution: any) {
    this.executionSource.next(execution);
  }
}
