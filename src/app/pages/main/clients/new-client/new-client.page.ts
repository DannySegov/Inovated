import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientsService } from 'src/app/services/clients.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.page.html',
  styleUrls: ['./new-client.page.scss'],
})
export class NewClientPage implements OnInit {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  //public newClientForm!: FormGroup;
  private clientService = inject(ClientsService);
  private notificationService = inject(NotificationService);

  constructor() { }


  public newClientForm: FormGroup = this.fb.group({
    nombre: ['Roberto García', [Validators.required]],
    telefono: ['5512349876', [Validators.required]],
    correo: ['roberto.garcia@email.com', [Validators.required, Validators.email]],
    observaciones: ['Interesado en mantenimiento de cámaras en un edificio comercial', [Validators.required]],
    direccion: this.fb.group({
      calle: ['Av. Reforma Norte', [Validators.required]],
      numeroExterior: ['1500', [Validators.required]],
      numeroInterior: ['101', [Validators.required]],
      colonia: ['Polanco', [Validators.required]],
      codigoPostal: ['11560', [Validators.required]],
      ciudad: ['Ciudad de México', [Validators.required]],
      estado: ['CDMX', [Validators.required]]
    }),
    contactosAdicionales: this.fb.array([]), // Inicializa como un array vacío
    informacionFiscal: this.fb.group({
      rfc: ['ROGA750620XXX', [Validators.required]],
      razonSocial: ['Servicios Comerciales García S.A. de C.V.', [Validators.required]],
      tipoPersona: [2, [Validators.required]],  // Persona moral
      direccion: this.fb.group({
        calle: ['Av. Insurgentes Sur', [Validators.required]],
        numeroExterior: ['2200', [Validators.required]],
        colonia: ['Nápoles', [Validators.required]],
        codigoPostal: ['03810', [Validators.required]],
        ciudad: ['Ciudad de México', [Validators.required]],
        estado: ['CDMX', [Validators.required]],
        numeroInterior: ['300', [Validators.required]]
      })
    })
  });
  
  get contactosAdicionales(): FormArray {
    return this.newClientForm.get('contactosAdicionales') as FormArray;
  }

  createContactoAdicional(): FormGroup {
    return this.fb.group({
      nombre: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]]
    });
  }

  addContactoAdicional() {
    this.contactosAdicionales.push(this.createContactoAdicional());
  }
  

  ngOnInit() {
  }

  addClient() {
    const dataClient = this.newClientForm.value;
    this.clientService.addClients(dataClient).subscribe(response => {
      this.notificationService.presentToast(response.mensaje,'top','success');
      this.clientService.updateClientsList();
      this.router.navigate(['/main/clients']);
    })
  }
}
