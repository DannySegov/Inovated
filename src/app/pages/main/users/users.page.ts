import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { JobsService } from 'src/app/services/jobs.service';
import { UsersService } from 'src/app/services/users.service';
import { ModalInfoUserComponent } from 'src/app/shared/components/modal-info-user/modal-info-user.component';
import { User } from 'src/app/shared/interfaces/users';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  
  @ViewChild(ModalInfoUserComponent) modalInfoUserComponent!: ModalInfoUserComponent;
  private usersService = inject(UsersService);
  private jobsService = inject(JobsService);

  public users: User[] = [];
  public puestoID!: number;
  public puestoNombre: string = '';

  constructor() { }

  ngOnInit() {
    this.usersService.users$.subscribe(users => {
      this.users = users;
      console.log('Usuarios:', users);
    });
    this.getUsers();
  }

  getUsers() {
    this.usersService.getUsers(10, 1).subscribe({
      next: (response: any) => {
        if (response.estatus) {
          this.usersService.updateUsersList(); // Actualizar la lista de usuarios
          response.datos.forEach((usuario: any) => {
            this.puestoID = usuario.perfil.puestoID;
            this.getJobById(this.puestoID);
          });
        } else {
          console.error('Error al recuperar los usuarios:', response.mensaje);
        }
      },
      error: (error) => {
        console.error('Error en la llamada al servicio de usuarios:', error);
      }
    });
  }

  getJobById(puestoID: number) {
    this.jobsService.getJobById(puestoID).subscribe(response => {
      this.puestoNombre = response.datos.nombre;
      console.log('Puesto:', response.datos.nombre);
    });
  }

  openUserModal(user: User) {
    this.modalInfoUserComponent.openUserModal(user.id);
    this.usersService.changeUser(user); // Enviar datos al servicio
    this.usersService.updateUsersList(); // Actualizar la lista de usuarios
  }
}