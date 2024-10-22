import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterInstallationPageRoutingModule } from './register-installation-routing.module';

import { RegisterInstallationPage } from './register-installation.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterInstallationPageRoutingModule,
    SharedModule
  ],
  declarations: [RegisterInstallationPage]
})
export class RegisterInstallationPageModule {}
