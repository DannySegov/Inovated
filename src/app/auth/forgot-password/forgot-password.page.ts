import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  private router = inject(Router);  
  
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]) //Valida que el campo sea requerido y que sea un email
  });
  constructor() { }

  ngOnInit() {
  }

  navigateTo(url: string) {
    this.router.navigate([url]);
  }

}
