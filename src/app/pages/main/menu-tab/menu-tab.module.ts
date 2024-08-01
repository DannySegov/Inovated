import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuTabPageRoutingModule } from './menu-tab-routing.module';

import { MenuTabPage } from './menu-tab.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuTabPageRoutingModule,
    SharedModule,
  ],
  declarations: [MenuTabPage],
  exports: [MenuTabPage]
})
export class MenuTabPageModule {}
