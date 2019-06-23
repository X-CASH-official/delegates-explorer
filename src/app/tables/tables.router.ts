import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { delegatesComponent } from './delegates/delegates.component';
import { delegates_statisticsComponent } from './delegates_statistics/delegates_statistics.component';
import { delegates_voters_listComponent } from './delegates_voters_list/delegates_voters_list.component';
import { round_statisticsComponent } from './round_statistics/round_statistics.component';

const materialWidgetRoutes: Routes = [
        { path: 'delegates', component: delegatesComponent , data: { animation: 'fixed' }},
        { path: 'delegates_statistics', component: delegates_statisticsComponent , data: { animation: 'fixed' }},
        { path: 'delegates_voters_list', component: delegates_voters_listComponent , data: { animation: 'fixed' }},
        { path: 'round_statistics', component: round_statisticsComponent , data: { animation: 'fixed' }}
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