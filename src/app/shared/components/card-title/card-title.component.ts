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
  @Input() iconPosition: 'left' | 'right' = 'left';

  isNewClientPage!: boolean;
  isServiceRequestPage!: boolean; 
  isUserAssignmentPage!: boolean;
  isUprisingPage!: boolean; 
  isQuotePage!: boolean;  
  isNewServicePage!: boolean;
  isEditServicePage!: boolean;
  isNewUserPage!: boolean;
  isEditUserPage!: boolean;

  ngOnInit() {
    this.isNewClientPage = this.router.url.includes('main/clients/new-client');
    this.isServiceRequestPage = this.router.url.includes('main/clients/service-request');
    this.isUserAssignmentPage = this.router.url.includes('main/requests/user-assigment');
    this.isUprisingPage = this.router.url.includes('main/uprisings/register-uprising');
    this.isQuotePage = this.router.url.includes('main/quotes/quote');
    this.isNewServicePage = this.router.url.includes('main/services/new-service');
    this.isEditServicePage = this.router.url.includes('main/services/edit-service');
    this.isNewUserPage = this.router.url.includes('main/users/new-user');
    this.isEditUserPage = this.router.url.includes('main/users/edit-user');
  }

  navigateTo(url: string) {
    this.router.navigate([url]);
  }
}
