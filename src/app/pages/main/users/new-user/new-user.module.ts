import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewUserPageRoutingModule } from './new-user-routing.module';

import { NewUserPage } from './new-user.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { MenuTabPageModule } from '../../menu-tab/menu-tab.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewUserPageRoutingModule,
    SharedModule,
    MenuTabPageModule,
  ],
  declarations: [NewUserPage]
})
export class NewUserPageModule {}
