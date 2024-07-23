import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExecutionsPageRoutingModule } from './executions-routing.module';

import { ExecutionsPage } from './executions.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExecutionsPageRoutingModule,
    SharedModule
  ],
  declarations: [ExecutionsPage]
})
export class ExecutionsPageModule {}
