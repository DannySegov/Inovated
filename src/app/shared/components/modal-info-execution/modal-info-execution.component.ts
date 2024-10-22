import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { ExecutionsService } from 'src/app/services/executions.service';

@Component({
  selector: 'app-modal-info-execution',
  templateUrl: './modal-info-execution.component.html',
  styleUrls: ['./modal-info-execution.component.scss'],
})
export class ModalInfoExecutionComponent  implements OnInit {
  private executionsService = inject(ExecutionsService);
  private router = inject(Router);

  @ViewChild('modalExecution', { static: true }) modalExecution!: IonModal;

  public execution: any; 

  constructor() { }

  ngOnInit() {}

  openExecutionModal(levantamientoID: number) {
    this.executionsService.getExecutionById(levantamientoID).subscribe(request => {
      this.execution = request.datos;
      console.log('Ejecución:', this.execution);  
      this.executionsService.changeExecution(this.execution);
      this.modalExecution.present();
    });
  }

  onExecution() { 
    this.router.navigate(['/main/executions/register-installation']);
    this.modalExecution.dismiss();
  }
}
