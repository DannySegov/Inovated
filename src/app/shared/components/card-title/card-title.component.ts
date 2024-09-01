import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-title',
  templateUrl: './card-title.component.html',
  styleUrls: ['./card-title.component.scss'],
})
export class CardTitleComponent  implements OnInit {

  constructor(private router: Router) { }

  @Input() cardText: string = ''; 
  @Input() icon: string = ''; 
  @Input() iconPosition: 'left' | 'right' = 'left'; // Nueva propiedad

  isCustomerDetailPage!: boolean;
  isServiceRequestPage!: boolean; 

  ngOnInit() {
    this.isCustomerDetailPage = this.router.url.includes('main/clients/new-client');
    this.isServiceRequestPage = this.router.url.includes('main/clients/service-request');
  }

  navigateTo(url: string) {
    this.router.navigate([url]);
  }
}
