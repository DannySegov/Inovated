import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DataUser, InfoUserResponse } from 'src/app/shared/interfaces/auth';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  private authService = inject(AuthService);
  currentPath: any;
  public userData!: DataUser;

  constructor() { }

  pages = [
    { Title: 'Inicio', Url: 'home', Icon: 'home' },
    { Title: 'Clientes', Url: 'clients', Icon: 'cliente' },
    { Title: 'Solicitudes', Url: 'requests', Icon: 'solicitud' },
    { Title: 'Levantamientos', Url: 'uprisings', Icon: 'levantamiento' },
    { Title: 'Cotizaciones', Url: 'quotes', Icon: 'cotizacion' },
    { Title: 'Ejecuciones', Url: 'executions', Icon: 'ejecuciones' },
    { Title: 'Pagos Pendientes', Url: 'pending-payments', Icon: 'pagos-pendientes' },
    { Title: 'Servicios', Url: 'services', Icon: 'servicios' },
    { Title: 'Usuarios', Url: 'users', Icon: 'usuario' },
    { Title: 'Reportes', Url: 'reports', Icon: 'solicitud' },
    { Title: 'Configuración', Url: 'configuration', Icon: 'configuracion' },
  ];

  ngOnInit(): void {
    this.authService.infoUser().subscribe(
      (response) => {
        this.userData = response.datos;
        console.log('Datos del usuario recibidos:', this.userData);
      },
      (error) => {
        console.error('Error en la llamada al traer info:', error);
      }
    );
  }

  logout() {
    this.authService.logout();
  }
}
