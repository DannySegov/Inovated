import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthPageRoutingModule } from './auth-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { AuthPage } from './auth.page';

@NgModule({
  declarations: [
    AuthPage,
  ],
  imports: [
    CommonModule,
    FormsModule,
    //ReactiveFormsModule,
    IonicModule,
    AuthPageRoutingModule,
    SharedModule //Importamos el modulo compartido
  ],
})
export class AuthPageModule {}
