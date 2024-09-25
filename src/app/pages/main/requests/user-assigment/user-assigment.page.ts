import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RequestsService } from 'src/app/services/requests.service';

@Component({
  selector: 'app-user-assigment',
  templateUrl: './user-assigment.page.html',
  styleUrls: ['./user-assigment.page.scss'],
})
export class UserAssigmentPage implements OnInit {

  private fb = inject(FormBuilder);
  private requestsService = inject(RequestsService);

  public request: any; 
  
  constructor() { }

  public userAssigmentForm: FormGroup = this.fb.group({
    
  })

  ngOnInit() {
    const servicioID = this.request.servicioID;
    this.requestsService.getRequestById(servicioID).subscribe(request => {
      this.request = request.datos;
    });
  }

}
