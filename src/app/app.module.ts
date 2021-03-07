import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
// import { NgxJsonLdModule } from 'ngx-json-ld';
import { MatMenuModule} from '@angular/material/menu';


import { HttpdataService } from './services/http-request.service'
import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { LazyLoadModule } from './lazy-load/lazy-load.module';
import { AuthComponent } from './auth/auth.component';
import { DashboardCrmModule } from './dashboard-crm/dashboard-crm.module';
import { PlatformLocation } from '@angular/common';



export function getBaseHref(platformLocation: PlatformLocation): string {
    return platformLocation.getBaseHrefFromDOM();
}


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatSidenavModule,
    PerfectScrollbarModule,
    LazyLoadModule,
    DashboardCrmModule,
  //  NgxJsonLdModule,
    MatMenuModule
  ],
  providers: [
    HttpdataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
