import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServicesPage } from './services.page';

const routes: Routes = [
  {
    path: '',
    component: ServicesPage
  },
  {
    path: 'new-service',
    loadChildren: () => import('./new-service/new-service.module').then( m => m.NewServicePageModule)
  },
  {
    path: 'edit-service',
    loadChildren: () => import('./edit-service/edit-service.module').then( m => m.EditServicePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicesPageRoutingModule {}
