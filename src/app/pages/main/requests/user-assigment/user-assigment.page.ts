import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RequestsService } from 'src/app/services/requests.service';
import { Employee } from 'src/app/shared/interfaces/requests';

@Component({
  selector: 'app-user-assigment',
  templateUrl: './user-assigment.page.html',
  styleUrls: ['./user-assigment.page.scss'],
})
export class UserAssigmentPage implements OnInit {

  private fb = inject(FormBuilder);
  private requestsService = inject(RequestsService);

  public request: any; 
  public employees: Employee[] = [];
  
  constructor() { }

  public userAssigmentForm: FormGroup = this.fb.group({
    
  })

  ngOnInit() {
    this.getRequestById();
    this.getEmployees();
  }

  getRequestById() {
    this.requestsService.currentRequest.subscribe(request => {
      if (request) {
        this.request = request;
       console.log('Id recibido en user assigment:', request);
      }
    });
  }


  getEmployees() {
    this.requestsService.getEmployees().subscribe(response => {
      if (response) {
        this.employees = response;
        console.log('Empleados:', this.employees);
      }
    });
  }

}
