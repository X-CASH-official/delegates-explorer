import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { delegates_informationComponent } from './delegates_information.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { DashboardWidgetModule } from '../dashboard-widget/dashboard-widget.module';

export const appRoutes: Routes = [
    { path: '', component: delegates_informationComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes),
    MatIconModule,
    FlexLayoutModule,
    MatCardModule,
    DashboardWidgetModule
  ],
  declarations: [delegates_informationComponent],
  exports: [ ]
})
export class delegates_informationModule { }
