import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';
import { AuthService } from '../services/auth.service';
import { User } from '../shared/interfaces/auth';

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

  showNewPassword = false;
    showConfirmPassword = false;

    public loginForm: FormGroup = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
  });
  /*
  loginForm = new FormGroup({
    correo: new FormControl('', [Validators.required, Validators.email]), //Valida que el campo sea requerido y que sea un email
    password: new FormControl('', [Validators.required, Validators.minLength(6)]) //Valida que el campo sea requerido y que tenga al menos 6 caracteres
  });
  */

  constructor() { }

  ngOnInit() {
  }

  login() {
    if (this.loginForm.valid) {
      const formValue = this.loginForm.value;
      const user: User = {
        correo: formValue.correo || '', // Aseguramos que no sea null ni undefined
        password: formValue.password || '' // Aseguramos que no sea null ni undefined
      };

      this.authService.login(user).subscribe({
        next: () => this.router.navigateByUrl('/main/home'),
        error: (err) => console.error('Login failed', err) // Manejo de errores
      });
    } else {
      console.error('Formulario no válido');
    }
  }
}
