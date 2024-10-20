import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsersPageRoutingModule } from './users-routing.module';

import { UsersPage } from './users.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { MenuTabPageModule } from '../menu-tab/menu-tab.module';
import { NewUserPageModule } from './new-user/new-user.module';
import { EditUserPageModule } from './edit-user/edit-user.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsersPageRoutingModule,
    SharedModule,
    MenuTabPageModule,
    NewUserPageModule,
    EditUserPageModule
  ],
  declarations: [UsersPage]
})
export class UsersPageModule {}
