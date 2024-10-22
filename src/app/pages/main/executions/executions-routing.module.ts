import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExecutionsPage } from './executions.page';

const routes: Routes = [
  {
    path: '',
    component: ExecutionsPage
  },
  {
    path: 'register-installation',
    loadChildren: () => import('./register-installation/register-installation.module').then( m => m.RegisterInstallationPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExecutionsPageRoutingModule {}
