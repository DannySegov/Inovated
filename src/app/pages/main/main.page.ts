import { Component, inject, OnInit } from '@angular/core';
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
    { Title: 'Inicio', Url: 'home', Icon: 'home' },
    { Title: 'Clientes', Url: 'clientes', Icon: 'cliente' },
    { Title: 'Solicitudes', Url: 'solicitudes', Icon: 'solicitud' },
    { Title: 'Levantamientos', Url: 'levantamientos', Icon: 'levantamiento' },
    { Title: 'Cotizaciones', Url: 'cotizaciones', Icon: 'cotizacion' },
    { Title: 'Ejecuciones', Url: 'ejecuciones', Icon: 'ejecuciones' },
    { Title: 'Pagos Pendientes', Url: 'pagosPend', Icon: 'pagos-pendientes' },
    { Title: 'Servicios', Url: 'servicios', Icon: 'servicios' },
    { Title: 'Usuarios', Url: 'usuarios', Icon: 'usuario' },
    { Title: 'Reportes', Url: 'reportes', Icon: 'solicitud' },
    { Title: 'Configuración', Url: 'configuracion', Icon: 'configuracion' },
  ];

  router = inject(Router);

  ngOnInit() {
  }

}
