import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuotesPage } from './quotes.page';

const routes: Routes = [
  {
    path: '',
    component: QuotesPage
  },
  {
    path: 'quote',
    loadChildren: () => import('./quote/quote.module').then( m => m.QuotePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuotesPageRoutingModule {}
