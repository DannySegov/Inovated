import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UprisingsPageRoutingModule } from './uprisings-routing.module';

import { UprisingsPage } from './uprisings.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { MenuTabPageModule } from '../menu-tab/menu-tab.module';
import { MenuTabPageRoutingModule } from '../menu-tab/menu-tab-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UprisingsPageRoutingModule,
    SharedModule,
    MenuTabPageModule,
    MenuTabPageRoutingModule
  ],
  declarations: [UprisingsPage]
})
export class UprisingsPageModule {}
