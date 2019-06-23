import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { DashboardCrmComponent } from '../dashboard-crm/dashboard-crm.component';

export const appRoutes: Routes = [{
    path: '', component: AuthComponent, children: [
        { path: 'dashboard', component: DashboardCrmComponent },
        { path: 'tables', loadChildren: '../tables/tables.module#TablesModule' },
        { path: 'statistics', loadChildren: '../statistics/statistics.module#statisticsModule' },
        { path: 'delegates_information', loadChildren: '../delegates_information/delegates_information.module#delegates_informationModule' },
    ]
}];
