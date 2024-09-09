import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPage } from './main.page';
import { isAuthenticatedGuard } from 'src/app/auth/guards/isAuthenticated.guard';

const routes: Routes = [
  {
    path: '',
    component: MainPage, 
    children: [
      {
        path: 'home',
        //canActivate: [ isAuthenticatedGuard ],
        loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'clients',
        loadChildren: () => import('./clients/clients.module').then( m => m.ClientsPageModule)
      },
      {
        path: 'requests',
        loadChildren: () => import('./requests/requests.module').then( m => m.RequestsPageModule)
      },
      {
        path: 'uprisings',
        loadChildren: () => import('./uprisings/uprisings.module').then( m => m.UprisingsPageModule)
      },
      {
        path: 'quotes',
        loadChildren: () => import('./quotes/quotes.module').then( m => m.QuotesPageModule)
      },
      {
        path: 'executions',
        loadChildren: () => import('./executions/executions.module').then( m => m.ExecutionsPageModule)
      },
      {
        path: 'pending-payments',
        loadChildren: () => import('./pending-payments/pending-payments.module').then( m => m.PendingPaymentsPageModule)
      },
      {
        path: 'services',
        loadChildren: () => import('./services/services.module').then( m => m.ServicesPageModule)
      },
      {
        path: 'users',
        loadChildren: () => import('./users/users.module').then( m => m.UsersPageModule)
      },
      {
        path: 'reports',
        loadChildren: () => import('./reports/reports.module').then( m => m.ReportsPageModule)
      },
      {
        path: 'configuration',
        loadChildren: () => import('./configuration/configuration.module').then( m => m.ConfigurationPageModule)
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule {}
