import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterUprisingPageRoutingModule } from './register-uprising-routing.module';

import { RegisterUprisingPage } from './register-uprising.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { MenuTabPageModule } from '../../menu-tab/menu-tab.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterUprisingPageRoutingModule,
    SharedModule,
    //MenuTabPageModule,
  ],
  declarations: [RegisterUprisingPage]
})
export class RegisterUprisingPageModule {}
