import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { UprisingsPageRoutingModule } from './uprisings-routing.module';

import { SharedModule } from 'src/app/shared/shared.module';
import { MenuTabPageModule } from '../menu-tab/menu-tab.module';
import { UprisingsPage } from './uprisings.page';
import { RegisterUprisingPageModule } from './register-uprising/register-uprising.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UprisingsPageRoutingModule,
    SharedModule,
    MenuTabPageModule,
    RegisterUprisingPageModule
  ],
  declarations: [UprisingsPage]
})
export class UprisingsPageModule {}
