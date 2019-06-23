import { Component, OnInit } from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
} from '@angular/animations'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  

})
export class AppComponent {
  title = 'app';
  getRouteAnimation(outlet) {
      
      return outlet.activatedRouteData.animation
  }

  constructor(private router: Router)
  {
    // override the route reuse strategy
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;  
  }

  ngOnInit() {    
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
}
