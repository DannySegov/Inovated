import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientsPageRoutingModule } from './clients-routing.module';

import { ClientsPage } from './clients.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { MenuTabPageModule } from '../menu-tab/menu-tab.module';
import { CustomerDetailPageModule } from './customer-detail/customer-detail.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientsPageRoutingModule,
    SharedModule,
    MenuTabPageModule,
    CustomerDetailPageModule
  ],
  declarations: [ClientsPage]
})
export class ClientsPageModule {}
