import { Component, Input, OnInit } from '@angular/core';
import { Client } from '../../interfaces/clients';
import { Router } from '@angular/router';

@Component({
  selector: 'app-name-client',
  templateUrl: './name-client.component.html',
  styleUrls: ['./name-client.component.scss'],
})
export class NameClientComponent  implements OnInit {

  constructor(private router: Router) { }
  @Input() client: any; //TODO: Cambiar a Client
  @Input() request: any; 
  @Input() employee!: boolean;

  isUserAssignmentPage!: boolean;
  isClientsPage!: boolean;

  ngOnInit() {
    console.log('Cliente name', this.client);
    this.isUserAssignmentPage = this.router.url.includes('main/requests/user-assigment');
    this.isClientsPage = this.router.url.includes('main/clients');
  }

  getInitials(name: string): string {
    if (!name) return '';
    const nameParts = name.split(' ');
    if (nameParts.length < 2) return nameParts[0][0];
    return nameParts[0][0] + nameParts[1][0];
  }

}
