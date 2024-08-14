import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.page.html',
  styleUrls: ['./customer-detail.page.scss'],
})
export class CustomerDetailPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]), //Valida que el campo sea requerido y que sea un email
    password: new FormControl('', [Validators.required, Validators.minLength(6)]) //Valida que el campo sea requerido y que tenga al menos 6 caracteres
  });


  navigateToClients() {
    this.router.navigate(['/main/clients']);
  }
  

}
