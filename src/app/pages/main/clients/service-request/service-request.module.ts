import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServiceRequestPageRoutingModule } from './service-request-routing.module';

import { ServiceRequestPage } from './service-request.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServiceRequestPageRoutingModule,
    SharedModule
  ],
  declarations: [ServiceRequestPage],
})
export class ServiceRequestPageModule {}
