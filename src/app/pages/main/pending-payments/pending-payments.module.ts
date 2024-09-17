import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PendingPaymentsPageRoutingModule } from './pending-payments-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MenuTabPageModule } from '../menu-tab/menu-tab.module';
import { PendingPaymentsPage } from './pending-payments.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PendingPaymentsPageRoutingModule,
    SharedModule,
    MenuTabPageModule
  ],
  declarations: [PendingPaymentsPage]
})
export class PendingPaymentsPageModule {}
