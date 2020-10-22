import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { APIComponent } from './API.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';

import * as hljs from 'highlight.js';
import { HighlightJsModule, HIGHLIGHT_JS } from 'angular-highlight-js';
import * as hljsJson from 'highlight.js/lib/languages/json';
import * as hljsBash from 'highlight.js/lib/languages/bash';
import * as hljsJasc from 'highlight.js/lib/languages/javascript';
import * as hljsCpp from 'highlight.js/lib/languages/cpp';

import * as hljsCoffeescript from 'highlight.js/lib/languages/coffeescript';
import * as hljsTypescript from 'highlight.js/lib/languages/typescript';
import * as hljsPhp from 'highlight.js/lib/languages/php';
import * as hljsPython from 'highlight.js/lib/languages/python';
import * as hljsJava from 'highlight.js/lib/languages/java';




import { DashboardWidgetModule } from '../dashboard-widget/dashboard-widget.module';

export const appRoutes: Routes = [
    { path: '', component: APIComponent },
];

export function highlightJsFactory(): any {
  hljs.registerLanguage('json', hljsJson);
  hljs.registerLanguage('bash', hljsBash);
  hljs.registerLanguage('javascript', hljsJasc);
  hljs.registerLanguage('cpp', hljsCpp);
  hljs.registerLanguage('coffeescript', hljsCoffeescript);
  hljs.registerLanguage('typescript', hljsTypescript);
  hljs.registerLanguage('php', hljsPhp);
  hljs.registerLanguage('python', hljsPython);
  hljs.registerLanguage('java', hljsJava);

  return hljs;
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes),
    FlexLayoutModule,
    MatCardModule,
    MatToolbarModule,
    MatTabsModule,
    HighlightJsModule.forRoot({
      provide: HIGHLIGHT_JS,
      useFactory: highlightJsFactory
    }),
    DashboardWidgetModule
  ],
  declarations: [APIComponent],
  exports: [ ]
})
export class APIModule { }
