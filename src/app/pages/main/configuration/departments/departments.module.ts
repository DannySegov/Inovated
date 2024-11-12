import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DepartmentsPageRoutingModule } from './departments-routing.module';

import { DepartmentsPage } from './departments.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DepartmentsPageRoutingModule,
    SharedModule
  ],
  declarations: [DepartmentsPage]
})
export class DepartmentsPageModule {}
