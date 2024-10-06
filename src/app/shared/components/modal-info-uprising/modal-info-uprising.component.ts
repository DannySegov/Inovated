import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { NotificationService } from 'src/app/services/notification.service';
import { UprisingsService } from 'src/app/services/uprisings.service';
import { Request } from '../../interfaces/requests';
import { RequestsService } from 'src/app/services/requests.service';

@Component({
  selector: 'app-modal-info-uprising',
  templateUrl: './modal-info-uprising.component.html',
  styleUrls: ['./modal-info-uprising.component.scss'],
})
export class ModalInfoUprisingComponent  implements OnInit {

  @ViewChild(IonModal) modal!: IonModal;
  @ViewChild('modalUprising', { static: true }) modalUprising!: IonModal;
  @ViewChild('deleteModal', { static: true }) deleteModal!: IonModal;

  private router = inject(Router);
  private uprisingsService = inject(UprisingsService);
  private requestsService = inject(RequestsService);
  private notificationService = inject(NotificationService);
  public requests: any[] = [];
  public uprising: any; 
  
  constructor() { }

  ngOnInit() {}

  openUprisingModal(servicioID: number) {
    this.requestsService.getRequestById(servicioID).subscribe(request => {
      this.uprising = request.datos;
      this.modalUprising.present();
    });
  }

  onRegister() { 
    this.router.navigate(['/main/uprisings/register-uprising']);
    this.modalUprising.dismiss();
  }

}
