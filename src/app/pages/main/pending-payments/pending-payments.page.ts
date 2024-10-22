import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { PendingPaymentsService } from 'src/app/services/pending-payments.service';
import { ModalInfoPaymentComponent } from 'src/app/shared/components/modal-info-payment/modal-info-payment.component';
import { Cotizacion } from 'src/app/shared/interfaces/pending-payments';

@Component({
  selector: 'app-pending-payments',
  templateUrl: './pending-payments.page.html',
  styleUrls: ['./pending-payments.page.scss'],
})
export class PendingPaymentsPage implements OnInit {

  private pendingPaymentsService = inject(PendingPaymentsService);

  @ViewChild(ModalInfoPaymentComponent) modalInfoPaymentComponent!: ModalInfoPaymentComponent;

  public pendingPayments: Cotizacion[] = [];
  constructor() { }

  ngOnInit() {
    this.pendingPaymentsService.pendingPayments$.subscribe(pendingPayments => {
      this.pendingPayments = pendingPayments;
      console.log('Pagos pendientes finales:', pendingPayments);
    });
    this.getPendingPayments();
  }

  getPendingPayments() {
    this.pendingPaymentsService.getPendingPayments(10, 1).subscribe({
      next: (resp: any) => {
        if (resp.estatus) {
          this.pendingPayments = resp.datos;
          console.log('Pagos Pendientes:', this.pendingPayments);
        } else {
          console.error('Error al recuperar las cotizaciones:', resp.mensaje);
        }
      },
      error: (error) => {
        console.error('Error en la llamada al servicio de levantamientos:', error);
      }
    })
  }

  openPaymentModal(payment: any) { // Método para abrir el modal de información del cliente 
    this.modalInfoPaymentComponent.openPaymentModal(payment.cotizacionID);
    this.pendingPaymentsService.changePayment(payment);
    console.log('Pago seleccionado:', payment.cotizacionID);
  }
}
