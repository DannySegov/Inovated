import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { QuotesService } from 'src/app/services/quotes.service';

@Component({
  selector: 'app-modal-info-quote',
  templateUrl: './modal-info-quote.component.html',
  styleUrls: ['./modal-info-quote.component.scss'],
})
export class ModalInfoQuoteComponent  implements OnInit {
  private quotesService = inject(QuotesService);
  private router = inject(Router);

  @ViewChild('modalQuote', { static: true }) modalQuote!: IonModal;

  public quote: any; 

  constructor() { }

  ngOnInit() {}


  openUprisingModal(servicioID: number) {
    this.quotesService.getQuoteById(servicioID).subscribe(request => {
      this.quote = request.datos;
      this.modalQuote.present();
    });
  }

  onQuote() { 
    this.router.navigate(['/main/quotes/quote']);
    this.modalQuote.dismiss();
  }
}
