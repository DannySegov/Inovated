import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { JobsService } from 'src/app/services/jobs.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-modal-info-user',
  templateUrl: './modal-info-user.component.html',
  styleUrls: ['./modal-info-user.component.scss'],
})
export class ModalInfoUserComponent implements OnInit {

  @ViewChild('modalUser', { static: true }) modalUser!: IonModal;
  @ViewChild('deleteModal', { static: true }) deleteModal!: IonModal;

  private router = inject(Router);
  private usersService = inject(UsersService);
  private jobsService = inject(JobsService);
  private notificationService = inject(NotificationService);

  public user: any;
  public puestoID!: any;
  public puestoNombre: string = '';

  constructor() { }

  ngOnInit() { }

  openUserModal(id: number) { // Método para abrir el modal de clientes
    this.usersService.getUserById(id).subscribe(user => {
      this.user = user.datos;
      this.puestoID = this.user.perfil.puestoID;
      this.getJobById(this.puestoID);
      this.modalUser.present();
    });
  }

  getJobById(puestoID: number) {
    this.jobsService.getJobById(puestoID).subscribe(response => {
      this.puestoNombre = response.datos.nombre;
    });
  }

  openDeleteModal() {
    this.modalUser.dismiss();
    this.deleteModal.present();
  }

  cancel() {
    this.deleteModal.dismiss();
  }

  deleteUser() {
    const id = this.user.id;
    this.usersService.deleteUser(id).subscribe(response => {
      if (response.estatus) {
        this.notificationService.presentToast(response.mensaje, 'top', 'success');
        this.deleteModal.dismiss();
        this.usersService.updateServicesList();
        this.router.navigate(['/main/users']);
      }
    });
  }
}
