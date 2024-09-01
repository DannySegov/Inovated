import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientsPage } from './clients.page';

const routes: Routes = [
  {
    path: '',
    component: ClientsPage
  },
  {
    path: 'new-client',
    loadChildren: () => import('./new-client/new-client.module').then( m => m.NewClientPageModule)
  },
  {
    path: 'service-request',
    loadChildren: () => import('./service-request/service-request.module').then( m => m.ServiceRequestPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientsPageRoutingModule {}
