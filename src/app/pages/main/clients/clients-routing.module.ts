import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientsPage } from './clients.page';

const routes: Routes = [
  {
    path: '',
    component: ClientsPage
  },
  {
    path: 'customer-detail',
    loadChildren: () => import('./customer-detail/customer-detail.module').then( m => m.CustomerDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientsPageRoutingModule {}
