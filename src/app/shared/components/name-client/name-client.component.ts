import { Component, Input, OnInit } from '@angular/core';
import { Client } from '../../interfaces/clients';

@Component({
  selector: 'app-name-client',
  templateUrl: './name-client.component.html',
  styleUrls: ['./name-client.component.scss'],
})
export class NameClientComponent  implements OnInit {

  constructor() { }
  
  //@Input() client!: Client;
  @Input() client!: any; //TODO: Cambiar a Client
  ngOnInit() {}

}
