import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UprisingsService } from 'src/app/services/uprisings.service';

@Component({
  selector: 'app-register-uprising',
  templateUrl: './register-uprising.page.html',
  styleUrls: ['./register-uprising.page.scss'],
})
export class RegisterUprisingPage implements OnInit {

  private fb = inject(FormBuilder);
  private uprisingsService = inject(UprisingsService);
  selectedUprising: any;

  public selectedDate: string = 'dd / mm / aaaa';
  public selectedTime: string = '12:00 pm'; 

  public registerUprisingForm: FormGroup = this.fb.group({
    servicio: [{ value: '', disabled: true }],
    clave: [{ value: '', disabled: true }],
    categoria: [{ value: '', disabled: true }],
    fecha: [{ value: '', disabled: true }],
    hora: [{ value: '', disabled: true }],
    descripcion: [{ value: '', disabled: true }]
  });
  
  constructor() { }

  ngOnInit() {
    this.getUprisingById();
  }

  // Método para obtener los levantamientos por ID
  getUprisingById() {
    this.uprisingsService.currentData.subscribe(data => {
        this.selectedUprising = data;
        console.log('Datos recibidos en otro componente:', this.selectedUprising);

        // Verificar que los datos no estén vacíos y que tengan infoServicio
        if (this.selectedUprising && this.selectedUprising.infoServicio) {
            this.registerUprisingForm.patchValue({
                servicio: this.selectedUprising.infoServicio.nombreServicio || '',
                clave: this.selectedUprising.infoServicio.claveServicio || '',
                categoria: this.selectedUprising.infoServicio.categoria || '',
                fecha: this.selectedUprising.fecha || '',
                hora: this.selectedUprising.hora || '',
                descripcion: this.selectedUprising.descripcion || ''
            });
        } else {
            console.error('Estructura de datos inesperada:', this.selectedUprising);
        }
    });
}

}