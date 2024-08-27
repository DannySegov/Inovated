import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-service-request',
  templateUrl: './service-request.page.html',
  styleUrls: ['./service-request.page.scss'],
})
export class ServiceRequestPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  options = [
    { name: 'Instalación de camaras', value: '1' },
  ]

  onButtonClick() {
    // Lógica para manejar el clic del botón
    console.log('Botón clicado');
  }
}
