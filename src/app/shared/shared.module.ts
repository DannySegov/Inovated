import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { CustomInputComponent } from './components/custom-input/custom-input.component';
import { LogoComponent } from './components/logo/logo.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardTitleComponent } from './components/card-title/card-title.component';
import { ListCardComponent } from './components/list-card/list-card.component';
import { MenuTabPageModule } from '../pages/main/menu-tab/menu-tab.module';
import { MenuTabPage } from '../pages/main/menu-tab/menu-tab.page';
import { FormAuthComponent } from './components/form-auth/form-auth.component';
import { ModalInfoComponent } from './components/modal-info/modal-info.component';
import { NameClientComponent } from './components/name-client/name-client.component';


@NgModule({
  declarations: [
    HeaderComponent,
    CustomInputComponent,
    FormAuthComponent,
    LogoComponent,
    CardTitleComponent,
    ListCardComponent,
    ModalInfoComponent,
    NameClientComponent,
  ],
  exports: [
    //Components
    HeaderComponent,
    CustomInputComponent,
    FormAuthComponent,
    LogoComponent,
    CardTitleComponent,
    ListCardComponent,
    ModalInfoComponent,
    NameClientComponent,
    ReactiveFormsModule,

    //Modules
    ReactiveFormsModule,
  ],
  imports: [ //Aqui importamos modulos para que nuestros componentes funcionen
    CommonModule,
    IonicModule,
    ReactiveFormsModule, //Formularios reactivos
    FormsModule,
  ]
})
export class SharedModule { }
