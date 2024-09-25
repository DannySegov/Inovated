import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RequestsPage } from './requests.page';

const routes: Routes = [
  {
    path: '',
    component: RequestsPage
  },
  {
    path: 'user-assigment',
    loadChildren: () => import('./user-assigment/user-assigment.module').then( m => m.UserAssigmentPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestsPageRoutingModule {}
