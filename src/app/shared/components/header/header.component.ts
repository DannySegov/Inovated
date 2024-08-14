import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {

  @Input() title!: string; //Recibimos el titulo desde el componente padre
  @Input() showMenu!: boolean;

  @Input() cardText: string = ''; 
  @Input() icon: string = ''; 
  @Input() iconPosition: 'left' | 'right' = 'left'; // Nueva propiedad
  showCardTitle: boolean = true;
  
  constructor(private router: Router) { }

  ngOnInit() {
    this.showCardTitle = this.router.url !== '/main/home';
  }


}
