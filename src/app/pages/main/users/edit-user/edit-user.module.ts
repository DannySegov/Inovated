import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditUserPageRoutingModule } from './edit-user-routing.module';

import { EditUserPage } from './edit-user.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { MenuTabPageModule } from '../../menu-tab/menu-tab.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditUserPageRoutingModule,
    SharedModule,
    MenuTabPageModule
  ],
  declarations: [EditUserPage]
})
export class EditUserPageModule {}
