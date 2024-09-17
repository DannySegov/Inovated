import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.page.html',
  styleUrls: ['./new-client.page.scss'],
})
export class NewClientPage implements OnInit {

  private fb = inject(FormBuilder);

  public newClientForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]],
    telefono: ['', [Validators.required]],
    correo: ['', [Validators.required, Validators.email]],
    observaciones: ['', [Validators.required]],
    direccion: this.fb.group({
      calle: ['', [Validators.required]],
      numeroExterior: ['', [Validators.required]],
      colonia: ['', [Validators.required]],
      codigoPostal: ['', [Validators.required]],
      ciudad: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      numeroInterior: ['', [Validators.required]]
    }),
    contactosAdicionales: this.fb.array([]),
    informacionFiscal: this.fb.group({
      rfc: ['', [Validators.required]],
      razonSocial: ['', [Validators.required]],
      tipoPersona: [0, [Validators.required]],
      direccion: this.fb.group({
        calle: ['', [Validators.required]],
        numeroExterior: ['', [Validators.required]],
        colonia: ['', [Validators.required]],
        codigoPostal: ['', [Validators.required]],
        ciudad: ['', [Validators.required]],
        estado: ['', [Validators.required]],
        numeroInterior: ['', [Validators.required]]
      })
    })
  });

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigateToClients() { // Método para navegar a la lista de clientes
    this.router.navigate(['/main/clients']);
  }
}
