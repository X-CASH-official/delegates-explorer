import { Component, OnInit, Input } from '@angular/core';
import { ToolbarHelpers } from './toolbar.helpers';

@Component({
  selector: 'cdk-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Input() sidenav;
	@Input() sidebar;
	@Input() drawer;
	@Input() matDrawerShow;

  searchOpen: boolean = false;
  toolbarHelpers = ToolbarHelpers;

  appId = 'dark-theme'; // default

  switchTheme(appId: string) {
    this.appId = appId; // changing theme based on choice
    let body = document.getElementsByTagName('body')[0];
    body.classList.remove("dark-theme","light-theme","unicorn-theme","darksea-theme");   //remove theme class
    body.classList.add(appId + "-theme");   //add selected theme
    window.localStorage.setItem('xcash-explorer-theme-preference', appId );
  }

	constructor() { }

	ngOnInit() { }

}
