import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      next: (isAuthenticated) => {
        if (isAuthenticated) {
          this.router.navigateByUrl('/main/home');
        }
      }
    });
  }
}
