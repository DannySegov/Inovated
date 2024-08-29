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

  constructor() { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.loginForm.value).subscribe({
      next: () => this.router.navigateByUrl('/main/home')
    });
  }

  /*
  login() {
    if (this.loginForm.valid) {
      const formValue = this.loginForm.value;
      const user: User = {
        correo: formValue.correo || '', 
        password: formValue.password || '' 
      };

      this.authService.login(user).subscribe({
        next: () => this.router.navigateByUrl('/main/home'),
        error: (err) => console.error('Login failed', err) 
      });
    } else {
      console.error('Formulario no válido');
    }
  }
    */
}
