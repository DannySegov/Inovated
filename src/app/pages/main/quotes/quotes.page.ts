import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { QuotesService } from 'src/app/services/quotes.service';
import { ModalInfoQuoteComponent } from 'src/app/shared/components/modal-info-quote/modal-info-quote.component';
import { Quote } from 'src/app/shared/interfaces/quote';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.page.html',
  styleUrls: ['./quotes.page.scss'],
})
export class QuotesPage implements OnInit {
  private quotesService = inject(QuotesService);

  @ViewChild(ModalInfoQuoteComponent) modalInfoQuoteComponent!: ModalInfoQuoteComponent;

  public quotes: Quote[] = [];

  constructor() { }

  ngOnInit() {
    this.getQuotes();
  }

  getQuotes() {
    this.quotesService.getQuotes(10, 1).subscribe({
      next: (resp: any) => {
        if (resp.estatus) {
          this.quotes = resp.datos;
        } else {
          console.error('Error al recuperar las cotizaciones:', resp.mensaje);
        }
      },
      error: (error) => {
        console.error('Error en la llamada al servicio de levantamientos:', error);
      }
    })
  }

  openQuoteModal(quote: any) {
    this.modalInfoQuoteComponent.openUprisingModal(quote.servicioID);
    this.quotesService.changeData(quote); // Enviar datos al servicio
  }
}
