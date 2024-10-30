import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardTitleComponent } from './components/card-title/card-title.component';
import { ModalInfoComponent } from './components/modal-info/modal-info.component';
import { NameClientComponent } from './components/name-client/name-client.component';
import { InfoClientComponent } from './components/info-client/info-client.component';
import { ModalInfoRequestComponent } from './components/modal-info-request/modal-info-request.component';
import { ModalInfoUprisingComponent } from './components/modal-info-uprising/modal-info-uprising.component';
import { ModalInfoQuoteComponent } from './components/modal-info-quote/modal-info-quote.component';
import { ModalInfoServiceComponent } from './components/modal-info-service/modal-info-service.component';
import { ModalInfoUserComponent } from './components/modal-info-user/modal-info-user.component';
import { ModalInfoExecutionComponent } from './components/modal-info-execution/modal-info-execution.component';
import { ModalInfoPaymentComponent } from './components/modal-info-payment/modal-info-payment.component';

@NgModule({
  declarations: [
    HeaderComponent,
    CardTitleComponent,
    ModalInfoComponent,
    NameClientComponent,
    InfoClientComponent,
    ModalInfoRequestComponent,
    ModalInfoUprisingComponent,
    ModalInfoQuoteComponent,
    ModalInfoExecutionComponent,
    ModalInfoPaymentComponent,
    ModalInfoServiceComponent,
    ModalInfoUserComponent,
  ],
  exports: [
    //Components
    HeaderComponent,
    CardTitleComponent,
    ModalInfoComponent,
    NameClientComponent,
    InfoClientComponent,
    ModalInfoRequestComponent,
    ModalInfoUprisingComponent, 
    ModalInfoQuoteComponent,
    ModalInfoExecutionComponent,
    ModalInfoPaymentComponent,
    ModalInfoServiceComponent,
    ModalInfoUserComponent,
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
