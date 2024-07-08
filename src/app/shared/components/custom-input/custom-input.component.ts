import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
})
export class CustomInputComponent implements OnInit {

  @Input() control!: FormControl;
  @Input() type!: string; 
  @Input() label!: string;
  @Input() autocomplete!: string;
  @Input() icon!: string;

  isPassword!: boolean;
  hide: boolean = true; //Es para decir si la contraseña debe estar o no oculta

  constructor() { }

  ngOnInit() {
    if (this.type == 'password') {
      this.isPassword = true;
    }
  }

  showOrHidePassword() { //Función para mostrar u ocultar la contraseña
    this.hide = !this.hide; //Cambiamos el valor de hide que inicialmente esta en true a false cuando presionamos el botón y viceversa

    if (this.hide) {
      this.type = 'password'; //Si hide es true, el tipo de input es password
    } else {
      this.type = 'text'; //Si hide es false, el tipo de input es text
    }
  }

}
