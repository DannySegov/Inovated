import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RequestResponse } from '../shared/interfaces/requests';
import { Uprising } from '../shared/interfaces/uprisings';
import { ResponseAdd } from '../shared/interfaces/clients';

@Injectable({
  providedIn: 'root'
})
export class UprisingsService {
  private http = inject(HttpClient);

  private readonly baseUrl: string = environment.baseUrl;
  private readonly headers: HttpHeaders = new HttpHeaders().set('Authorization', `Bearer ${this.accessToken}`);

  private dataUprising = new BehaviorSubject<any>(null);
  currentData = this.dataUprising.asObservable();
  
  constructor() { }

  //Obtener Levantamientos
  getUprisings(elementos: number, pagina: number): Observable<RequestResponse> {
    return this.http.get<RequestResponse>(`${this.baseUrl}/levantamientos`, { headers: this.headers });
  }

  //Agregar Levantamiento Servicio
  addUprisingService(servicioID: number, uprising: Uprising): Observable<ResponseAdd> {
    return this.http.post<ResponseAdd>(`${this.baseUrl}/levantamientos/agrega-levantamiento/${servicioID}`, uprising, { headers: this.headers });
  }

  // Método para obtener el token de acceso
  get accessToken(): string | null {
    return localStorage.getItem('access');
  }

  changeData(data: any) {
    this.dataUprising.next(data);
  }
}
