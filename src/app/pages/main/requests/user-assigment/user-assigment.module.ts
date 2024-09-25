import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserAssigmentPageRoutingModule } from './user-assigment-routing.module';

import { UserAssigmentPage } from './user-assigment.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { MenuTabPageModule } from '../../menu-tab/menu-tab.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserAssigmentPageRoutingModule,
    SharedModule,
    MenuTabPageModule
  ],
  declarations: [UserAssigmentPage]
})
export class UserAssigmentPageModule {}
