import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]), //Valida que el campo sea requerido y que sea un email
    password: new FormControl('', [Validators.required, Validators.minLength(6)]) //Valida que el campo sea requerido y que tenga al menos 6 caracteres
  });

  utilsService = inject(UtilsService);

  constructor() { }

  ngOnInit() {
  }

  async login() {
    if (this.form.valid) {
      const loading = await this.utilsService.loading();
      await loading.present();

      setTimeout(() => {
        loading.dismiss();
      }, 2500);
    }
  }

}
