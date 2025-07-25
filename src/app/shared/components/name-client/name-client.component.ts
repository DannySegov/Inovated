import { Component, Input, OnInit } from '@angular/core';
import { Client } from '../../interfaces/clients';
import { Router } from '@angular/router';

@Component({
  selector: 'app-name-client',
  templateUrl: './name-client.component.html',
  styleUrls: ['./name-client.component.scss'],
})
export class NameClientComponent implements OnInit {

  constructor(private router: Router) { }

  @Input() isModal: boolean = false;
  @Input() client: Client | null = null; // Cambiado a Client
  @Input() user: any = null;
  @Input() contact: any;
  @Input() request: any; 
  @Input() selectedUprising: any;
  @Input() employee!: boolean;
  @Input() pendingPayment!: any;

  isUserAssignmentPage!: boolean;
  isClientsPage!: boolean;
  isUserPage!: boolean;

  ngOnInit() {
    if (this.client) {
      console.log('Cliente name', this.client.nombre);
    }
    if (this.user) {
      console.log('User name', this.user.nombre);
    }
    this.isUserAssignmentPage = this.router.url.includes('main/requests/user-assigment');
    this.isClientsPage = this.router.url.includes('main/clients');
    this.isUserPage = this.router.url.includes('main/users');
  }

  getInitials(name: string): string {
    if (!name) return '';
    const nameParts = name.split(' ');
    if (nameParts.length < 2) return nameParts[0][0];
    return nameParts[0][0] + nameParts[1][0];
  }

  getInitialsUser(nombre: string, paterno: string): string {
    if (!nombre || !paterno) return '';
    return nombre[0] + paterno[0];
  }
}