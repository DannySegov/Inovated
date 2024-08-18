import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-name-client',
  templateUrl: './name-client.component.html',
  styleUrls: ['./name-client.component.scss'],
})
export class NameClientComponent  implements OnInit {

  constructor() { }
  
  @Input() client!: { name: string, color: string };
  ngOnInit() {}

}
