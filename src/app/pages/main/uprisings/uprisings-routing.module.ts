import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UprisingsPage } from './uprisings.page';

const routes: Routes = [
  {
    path: '',
    component: UprisingsPage
  },
  {
    path: 'register-uprising',
    loadChildren: () => import('./register-uprising/register-uprising.module').then( m => m.RegisterUprisingPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UprisingsPageRoutingModule {}
