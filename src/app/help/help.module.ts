import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HelpComponent } from './help.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

import { DashboardWidgetModule } from '../dashboard-widget/dashboard-widget.module';

import { MatDividerModule } from '@angular/material'
import { MatExpansionModule } from '@angular/material/expansion';

export const appRoutes: Routes = [
    { path: '', component: HelpComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes),
    FlexLayoutModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatExpansionModule,
    MatDividerModule,
    DashboardWidgetModule
  ],
  declarations: [
    HelpComponent
  ],
  exports: [ ]
})
export class helpModule { }
