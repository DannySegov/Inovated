import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { CustomInputComponent } from './components/custom-input/custom-input.component';
import { LogoComponent } from './components/logo/logo.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardTitleComponent } from './components/card-title/card-title.component';



@NgModule({
  declarations: [
    HeaderComponent,
    CustomInputComponent,
    LogoComponent,
    CardTitleComponent
  ],
  exports: [
    HeaderComponent,
    CustomInputComponent,
    LogoComponent,
    CardTitleComponent,
    ReactiveFormsModule
  ],
  imports: [ //Aqui importamos modulos para que nuestros componentes funcionen
    CommonModule,
    IonicModule,
    ReactiveFormsModule, //Formularios reactivos
    FormsModule
  ]
})
export class SharedModule { }
