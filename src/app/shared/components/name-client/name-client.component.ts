import { Component, Input, OnInit } from '@angular/core';
import { Client } from '../../interfaces/clients';

@Component({
  selector: 'app-name-client',
  templateUrl: './name-client.component.html',
  styleUrls: ['./name-client.component.scss'],
})
export class NameClientComponent  implements OnInit {

  constructor() { }
  @Input() client: any; //TODO: Cambiar a Client
  ngOnInit() {
    console.log('Cliente name', this.client);
  }

  getInitials(name: string): string {
    if (!name) return '';
    const nameParts = name.split(' ');
    if (nameParts.length < 2) return nameParts[0][0];
    return nameParts[0][0] + nameParts[1][0];
  }

}
