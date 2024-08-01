import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.page.html',
  styleUrls: ['./clients.page.scss'],
})
export class ClientsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  clients = [
    { name: 'Obed Jimenez Mendoza', address: 'Paseo de los Gavilanes #132-A', color: '#b9cb2d' },
    { name: 'Sebastian Bolaños', address: 'Grabadores de Aurora #112', color: '#f95252' },
    { name: 'Esteban Ortiz Villalpando', address: 'Eilat #1506 in 202 Los Angeles', color: '#0092d1' },
    { name: 'Diana Sanchez', address: 'Palo cuarto #117 El coecillo', color: '#d31e3c' },
    { name: 'Guillermo Carranza', address: 'Pueblo Nuevo #122 San Pedro', color: '#17a9bf' },
    { name: 'Diana Victoria Guerrero', address: 'Xichu #106 Moderna, León', color: '#0d3d57' },
  ];
}
