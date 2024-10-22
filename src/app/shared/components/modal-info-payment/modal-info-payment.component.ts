import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { PendingPaymentsService } from 'src/app/services/pending-payments.service';

@Component({
  selector: 'app-modal-info-payment',
  templateUrl: './modal-info-payment.component.html',
  styleUrls: ['./modal-info-payment.component.scss'],
})
export class ModalInfoPaymentComponent  implements OnInit {
  @ViewChild('modalPayment', { static: true }) modalPayment!: IonModal;
  @ViewChild('alertModal', { static: true }) alertModal!: IonModal;

  private pendingPaymentsService = inject(PendingPaymentsService);
  private router = inject(Router);
  
  public payment: any; 

  constructor() { }

  ngOnInit() {}

  openPaymentModal(cotizacionID: number) {
    this.pendingPaymentsService.getPendingPaymentById(cotizacionID).subscribe(payment => {
      this.payment = payment.datos;
      this.modalPayment.present();
    });
  }

  onReminder() { 
    this.modalPayment.dismiss();
    this.alertModal.present();
  }

  send() {
  }

  cancel() {
    this.alertModal.dismiss();
  }
}
