import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterUprisingPage } from './register-uprising.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterUprisingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterUprisingPageRoutingModule {}
