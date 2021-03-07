import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from '../auth/auth.component';
import { DashboardCrmComponent } from '../dashboard-crm/dashboard-crm.component';


const routes: Routes = [
    {
      path: '', component: AuthComponent, children: [
          { path: 'dashboard', component: DashboardCrmComponent },
          { path: 'delegates', loadChildren: () => import('../tables/tables.module').then(m => m.TablesModule) },
          { path: 'statistics', loadChildren: () => import('../statistics/statistics.module').then(m => m.statisticsModule) },
          { path: 'delegates/delegate_information', loadChildren: () => import('../delegates_information/delegates_information.module').then(m => m.delegates_informationModule) },
          { path: 'help', loadChildren: () => import('../help/help.module').then(m => m.helpModule) },
          { path: 'API', loadChildren: () => import('../API/API.module').then(m => m.APIModule) },
          { path: '', component: DashboardCrmComponent },
          { path: '**', redirectTo: '/dashboard' },
      ]
    },
  ];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class LazyLoadModule { }
