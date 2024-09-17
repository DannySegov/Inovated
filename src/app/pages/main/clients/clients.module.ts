import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ClientsPageRoutingModule } from './clients-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MenuTabPageModule } from '../menu-tab/menu-tab.module';
import { NewClientPageModule } from './new-client/new-client.module';
import { ServiceRequestPageModule } from './service-request/service-request.module';

import { ClientsPage } from './clients.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientsPageRoutingModule,
    SharedModule,
    MenuTabPageModule,
    NewClientPageModule,
    ServiceRequestPageModule
  ],
  declarations: [ClientsPage]
})
export class ClientsPageModule {}
