import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportsPageRoutingModule } from './reports-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MenuTabPageModule } from '../menu-tab/menu-tab.module';
import { ReportsPage } from './reports.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportsPageRoutingModule,
    SharedModule,
    MenuTabPageModule
  ],
  declarations: [ReportsPage]
})
export class ReportsPageModule {}
