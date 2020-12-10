import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DelegatesComponent } from './delegates/delegates.component';
import { Delegates_statisticsComponent } from './delegates_statistics/delegates_statistics.component';
import { Delegates_voters_listComponent } from './delegates_voters_list/delegates_voters_list.component';
import { Round_statisticsComponent } from './round_statistics/round_statistics.component';

const materialWidgetRoutes: Routes = [
        { path: '', component: DelegatesComponent , data: { animation: 'fixed' }},
        { path: 'delegate_statistics', component: Delegates_statisticsComponent , data: { animation: 'fixed' }},
        { path: 'delegate_voters_list', component: Delegates_voters_listComponent , data: { animation: 'fixed' }},
        { path: 'round_statistics', component: Round_statisticsComponent , data: { animation: 'fixed' }}
];

@NgModule({
  imports: [
    RouterModule.forChild(materialWidgetRoutes)
  	],
  exports: [
    RouterModule
  ]
})
export class TablesRouterModule {}
