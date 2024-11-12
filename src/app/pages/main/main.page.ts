import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DataUser } from 'src/app/shared/interfaces/auth';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  private authService = inject(AuthService);

  currentPath: any;
  public userData!: DataUser;
  public showSubOptions = false;
  public selectedPage: any = null;
  selectedOption!: HTMLElement;

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
    {
      Title: 'Configuración',
      Icon: 'configuracion',
      SubOptions: [
        { Title: 'Departamentos', Url: 'departments', Icon: 'usuario' },
        { Title: 'Puestos', Url: 'option2' }
      ]
    },
  ];

  constructor() { }

  ngOnInit(): void {
    this.getInfoUser();
  }

  getInfoUser() { // Método para obtener la información del usuario
    this.authService.infoUser().subscribe({
      next: (response: any) => {
        this.userData = response.datos;
      },
      error: (error) => {
        console.error('Error en la llamada al traer info:', error);
      }
    })
  }

  logout() { // Método para cerrar sesión
    this.authService.logout();
  }

  toggleSubOptions(page: any) { // Método para mostrar las opciones de configuracion
    this.showSubOptions = page.Title === 'Configuración' ? !this.showSubOptions : false;
    this.selectedPage = page.Title === 'Configuración' ? page : null;
  }

  selectSubOption(subOption: any) { // Método para seleccionar una opción de configuración
    this.currentPath = subOption.Url;
    this.showSubOptions = false;
    this.selectedPage = null;
  }

  selectOption(event: Event) { // Método para seleccionar una opción del menú y aplicar el estilo
    const element = event.currentTarget as HTMLElement;
    if (this.selectedOption) {
      this.selectedOption.classList.remove('selected-option');
    }
    element.classList.add('selected-option');
    this.selectedOption = element;
  }
}