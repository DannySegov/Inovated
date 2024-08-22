import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  private router = inject(Router);
  private fb = inject(FormBuilder);
  public authService = inject(AuthService);
  public utilsService = inject(UtilsService);
  
  
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]), //Valida que el campo sea requerido y que sea un email
    password: new FormControl('', [Validators.required, Validators.minLength(6)]) //Valida que el campo sea requerido y que tenga al menos 6 caracteres
  });
  

  /*
  public form: FormGroup = this.fb.group({
    email: ['', [ Validators.required, Validators.email ]],
    password: ['', [ Validators.required, Validators.minLength(6) ]],
  });
  */

  constructor() { }

  ngOnInit() {
  }

  login() {
    const email = this.form.value.email;
    const password = this.form.value.password;
  
    if (email && password) {
      this.authService.login(email, password)
        .subscribe(success => {
          console.log({ success });
        });
    } else {
      console.error('Email o contraseña no válidos');
    }
  }
  /*
  async login() {
    if (this.form.valid) {
      const loading = await this.utilsService.loading();
      await loading.present();

      setTimeout(() => {
        loading.dismiss();
      }, 2500);

      this.router.navigate(['/main/home']);
    }
  }
    */

}
