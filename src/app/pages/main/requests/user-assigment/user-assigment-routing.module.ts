import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserAssigmentPage } from './user-assigment.page';

const routes: Routes = [
  {
    path: '',
    component: UserAssigmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserAssigmentPageRoutingModule {}
