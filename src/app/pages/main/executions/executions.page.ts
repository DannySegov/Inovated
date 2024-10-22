import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ExecutionsService } from 'src/app/services/executions.service';
import { ModalInfoExecutionComponent } from 'src/app/shared/components/modal-info-execution/modal-info-execution.component';
import { Execution } from 'src/app/shared/interfaces/executions';

@Component({
  selector: 'app-executions',
  templateUrl: './executions.page.html',
  styleUrls: ['./executions.page.scss'],
})
export class ExecutionsPage implements OnInit {
  @ViewChild(ModalInfoExecutionComponent) modalInfoExecutionComponent!: ModalInfoExecutionComponent;
  
  private executionsService = inject(ExecutionsService);

  public executions: Execution[] = [];
  constructor() { }

  ngOnInit() {
    this.executionsService.executions$.subscribe(executions => {
      this.executions = executions;
      console.log('Ejecuciones finales:', executions);
    });
    this.getExecutions();
  }

  getExecutions() {
    this.executionsService.getExecutions(10, 1).subscribe({
      next: (resp: any) => {
        if (resp.estatus) {
          this.executions = resp.datos;
          console.log('Ejecuciones:', this.executions);
        } else {
          console.error('Error al recuperar las cotizaciones:', resp.mensaje);
        }
      },
      error: (error) => {
        console.error('Error en la llamada al servicio de levantamientos:', error);
      }
    })
  }

  openExecutionModal(execution: any) {
    this.modalInfoExecutionComponent.openExecutionModal(execution.levantamientoID);
    this.executionsService.changeExecution(execution); // Enviar datos al servicio
  }
}
