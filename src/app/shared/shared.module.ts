import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { CustomInputComponent } from './components/custom-input/custom-input.component';
import { LogoComponent } from './components/logo/logo.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardTitleComponent } from './components/card-title/card-title.component';
import { ListCardComponent } from './components/list-card/list-card.component';
import { ModalInfoComponent } from './components/modal-info/modal-info.component';
import { NameClientComponent } from './components/name-client/name-client.component';
import { InfoClientComponent } from './components/info-client/info-client.component';
import { CustomSelectComponent } from './components/custom-select/custom-select.component';
import { ModalInfoRequestComponent } from './components/modal-info-request/modal-info-request.component';
import { ModalInfoUprisingComponent } from './components/modal-info-uprising/modal-info-uprising.component';
import { ModalInfoQuoteComponent } from './components/modal-info-quote/modal-info-quote.component';
import { ModalInfoServiceComponent } from './components/modal-info-service/modal-info-service.component';

@NgModule({
  declarations: [
    HeaderComponent,
    CustomInputComponent,
    CustomSelectComponent,
    LogoComponent,
    CardTitleComponent,
    ListCardComponent,
    ModalInfoComponent,
    NameClientComponent,
    InfoClientComponent,
    ModalInfoRequestComponent,
    ModalInfoUprisingComponent,
    ModalInfoQuoteComponent,
    ModalInfoServiceComponent,
  ],
  exports: [
    //Components
    HeaderComponent,
    CustomInputComponent,
    CustomSelectComponent,
    LogoComponent,
    CardTitleComponent,
    ListCardComponent,
    ModalInfoComponent,
    NameClientComponent,
    InfoClientComponent,
    ModalInfoRequestComponent,
    ModalInfoUprisingComponent, 
    ModalInfoQuoteComponent,
    ModalInfoServiceComponent,
    //Modules
    ReactiveFormsModule,
  ],
  imports: [ //Aqui importamos modulos para que nuestros componentes funcionen
    CommonModule,
    IonicModule,
    ReactiveFormsModule, 
    FormsModule,
  ]
})
export class SharedModule { }
