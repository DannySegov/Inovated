import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { UprisingsService } from 'src/app/services/uprisings.service';
import { ModalInfoUprisingComponent } from 'src/app/shared/components/modal-info-uprising/modal-info-uprising.component';
import { Request } from 'src/app/shared/interfaces/requests';

@Component({
  selector: 'app-uprisings',
  templateUrl: './uprisings.page.html',
  styleUrls: ['./uprisings.page.scss'],
})
export class UprisingsPage implements OnInit {
  private uprisingsService = inject(UprisingsService);
  
  @ViewChild(ModalInfoUprisingComponent) modalInfoUprisingComponent!: ModalInfoUprisingComponent;
  
  public uprisings: Request[] = [];
  
  constructor() { }

  ngOnInit() {
    this.getUprisings();
  }

  getUprisings() {
    this.uprisingsService.getUprisings(10, 1).subscribe({
      next: (resp: any) => {
        if (resp.estatus) {
          this.uprisings = resp.datos;
          console.log('Levantamientos:', this.uprisings);
        } else {
          console.error('Error al recuperar los datos de los levantamientos:', resp.mensaje);
        }
      },
      error: (error) => {
        console.error('Error en la llamada al servicio de levantamientos:', error);
      }
    })
  }

  openRequestModal(uprising: any) {
    this.modalInfoUprisingComponent.openUprisingModal(uprising.servicioID);
    this.uprisingsService.changeData(uprising); // Enviar datos al servicio
    console.log('Levantamiento seleccionada:', uprising.servicioID);
  }
}