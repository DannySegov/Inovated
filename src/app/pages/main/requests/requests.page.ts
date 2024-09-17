import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalInfoComponent } from 'src/app/shared/components/modal-info/modal-info.component';
@Component({
  selector: 'app-requests',
  templateUrl: './requests.page.html',
  styleUrls: ['./requests.page.scss'],
})
export class RequestsPage implements OnInit {
  
  @ViewChild(ModalInfoComponent) modalInfoComponent!: ModalInfoComponent;

  clients = [
    { id: 1, name: 'Obed Jimenez Mendoza', address: 'Paseo de los Gavilanes #132-A', color: '#b9cb2d' },
    { id: 2, name: 'Sebastian Bolaños', address: 'Grabadores de Aurora #112', color: '#f95252' },
    { id: 3, name: 'Esteban Ortiz Villalpando', address: 'Eilat #1506 in 202 Los Angeles', color: '#0092d1' },
    { id: 4, name: 'Diana Sanchez', address: 'Palo cuarto #117 El coecillo', color: '#d31e3c' },
    { id: 5, name: 'Guillermo Carranza', address: 'Pueblo Nuevo #122 San Pedro', color: '#17a9bf' },
    { id: 6, name: 'Diana Victoria Guerrero', address: 'Xichu #106 Moderna, León', color: '#0d3d57' },
  ];

  constructor() { }

  ngOnInit() {
  }

  onCardClick(client: any) { // Método para abrir el modal de información del cliente 
    this.modalInfoComponent.openRequestModal(client);
  }
}
