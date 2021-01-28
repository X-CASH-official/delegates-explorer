import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { Delegates_informationComponent } from './delegates_information.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';

import { DashboardWidgetModule } from '../dashboard-widget/dashboard-widget.module';

export const appRoutes: Routes = [
    { path: '', component: Delegates_informationComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes),
    FlexLayoutModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatButtonToggleModule,
    DashboardWidgetModule,
    MatDividerModule,
    MatIconModule,
    MatTooltipModule
  ],
  declarations: [
    Delegates_informationComponent,
  ],
  exports: [ ]
})
export class delegates_informationModule { }
