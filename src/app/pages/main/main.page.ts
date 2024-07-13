import { Component, inject, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  currentPath: any;

  constructor() { }

  pages = [
    { Title: 'Inicio', Url: 'home', Icon: '/src/assets/icon/favicon.png' },
    { Title: 'Clientes', Url: 'clientes', Icon: 'home-outline' },
    { Title: 'Solicitudes', Url: 'solicitudes', Icon: 'home-outline' },
    { Title: 'Levantamientos', Url: 'levantamientos', Icon: 'home-outline' },
    { Title: 'Cotizaciones', Url: 'cotizaciones', Icon: 'home-outline' },
    { Title: 'Ejecuciones', Url: 'ejecuciones', Icon: 'home-outline' },
    { Title: 'Pagos Pendientes', Url: 'pagosPend', Icon: 'home-outline' },
    { Title: 'Servicios', Url: 'servicios', Icon: 'home-outline' },
    { Title: 'Usuarios', Url: 'usuarios', Icon: 'home-outline' },
    { Title: 'Reportes', Url: 'reportes', Icon: 'home-outline' },
    { Title: 'Configuración', Url: 'configuracion', Icon: 'home-outline' },
  ];

  router = inject(Router);

  ngOnInit() {
  }

}
