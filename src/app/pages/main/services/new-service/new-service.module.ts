import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewServicePageRoutingModule } from './new-service-routing.module';

import { NewServicePage } from './new-service.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { MenuTabPageModule } from '../../menu-tab/menu-tab.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewServicePageRoutingModule,
    SharedModule,
    MenuTabPageModule
  ],
  declarations: [NewServicePage]
})
export class NewServicePageModule {}
