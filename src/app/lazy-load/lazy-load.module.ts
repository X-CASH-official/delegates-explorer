import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from '../auth/auth.component';
import { DashboardCrmComponent } from '../dashboard-crm/dashboard-crm.component';


const routes: Routes = [
    {
      path: '', component: AuthComponent, children: [
          { path: 'dashboard', component: DashboardCrmComponent },
          { path: 'delegates', loadChildren: '../tables/tables.module#TablesModule' },
          { path: 'statistics', loadChildren: '../statistics/statistics.module#statisticsModule' },
          { path: 'delegates/delegate_information', loadChildren: '../delegates_information/delegates_information.module#delegates_informationModule' },
          { path: 'help', loadChildren: '../help/help.module#helpModule' },
          { path: 'API', loadChildren: '../API/API.module#APIModule' },
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
