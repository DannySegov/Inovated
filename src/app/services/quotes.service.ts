import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RequestResponse } from '../shared/interfaces/requests';
import { Quote } from '../shared/interfaces/quote';
import { ResponseAdd } from '../shared/interfaces/clients';

@Injectable({
  providedIn: 'root'
})
export class QuotesService {
  private http = inject(HttpClient);

  private readonly baseUrl: string = environment.baseUrl;
  private readonly headers: HttpHeaders = new HttpHeaders().set('Authorization', `Bearer ${this.accessToken}`);

  private dataQuote = new BehaviorSubject<any>(null);
 currentData = this.dataQuote.asObservable();

  constructor() { }

  //Obtener Cotizaciones
  getQuotes(elementos: number, pagina: number): Observable<RequestResponse> {
    return this.http.get<RequestResponse>(`${this.baseUrl}/cotizaciones`, { headers: this.headers });
  }

  // Obtener Cotización por ID
  getQuoteById(servicioID: number): Observable<RequestResponse> {
    return this.http.get<RequestResponse>(`${this.baseUrl}/cotizaciones/info-cotizacion/${servicioID}`, { headers: this.headers });
  }

   //Agregar Cotización
   addQuote(levantamientoID: number, quote: Quote): Observable<ResponseAdd> {
    return this.http.post<ResponseAdd>(`${this.baseUrl}/cotizaciones/crear-cotizacion/${levantamientoID}`, quote, { headers: this.headers });
  }


  // Método para obtener el token de acceso
  get accessToken(): string | null {
    return localStorage.getItem('access');
  }

  changeData(data: any) {
    this.dataQuote.next(data);
  }
}
