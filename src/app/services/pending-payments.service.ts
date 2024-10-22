import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cotizacion, PaymentResponse } from '../shared/interfaces/pending-payments';

@Injectable({
  providedIn: 'root'
})
export class PendingPaymentsService {
  private http = inject(HttpClient);

  private readonly baseUrl: string = environment.baseUrl;
  private readonly headers: HttpHeaders = new HttpHeaders().set('Authorization', `Bearer ${this.accessToken}`);

  private pendingPaymentsSource = new BehaviorSubject<any[]>([]); 
  public pendingPayments$ = this.pendingPaymentsSource.asObservable();

  private paymentSource = new BehaviorSubject<any>(null);
  currentpayment = this.paymentSource.asObservable();

  constructor() { }

  // Obtener Pagos Pendientes
  getPendingPayments(elementos: number, pagina: number): Observable<PaymentResponse> {
    return this.http.get<PaymentResponse>(`${this.baseUrl}/pagos?elementos=${elementos}&pagina=${pagina}`, { headers: this.headers });
  }

  // Obtener Pago Pendiente por ID
  getPendingPaymentById(cotizacionID: number): Observable<PaymentResponse> {
    return this.http.get<PaymentResponse>(`${this.baseUrl}/pagos/${cotizacionID}`, { headers: this.headers });
  }

  // Método para obtener el token de acceso
  get accessToken(): string | null {
    return localStorage.getItem('access');
  }

  changePayment(payment: any) {
    this.paymentSource.next(payment);
  }
}
