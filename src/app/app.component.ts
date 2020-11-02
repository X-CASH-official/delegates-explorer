import { Component, OnInit } from '@angular/core';
import { NavigationStart, NavigationEnd, Router } from '@angular/router';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})


export class AppComponent {

  loading:boolean = false;
  baseUrl: string;
  metaImage: string;


  getRouteAnimation(outlet) {
      return outlet.activatedRouteData.animation
  }

  constructor(private router: Router,  private meta: Meta) {
    // override the route reuse strategy
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    this.baseUrl = window.location.origin;
    var metaImage = this.baseUrl + "/assets/icons/apple-touch-icon-180x180.png";

    this.meta.updateTag({ property: 'og:url', content: this.baseUrl  });
    this.meta.updateTag({ property: 'og:image', content: metaImage  });

    this.meta.updateTag({ name: 'twitter:domain', value: this.baseUrl  });
    this.meta.updateTag({ name: 'twitter:url', value: window.location.href  });
    this.meta.updateTag({ name: 'twitter:image', content: metaImage  });

  }

  ngOnInit() {

    this.router.events.subscribe((event) => {

      if(event instanceof NavigationStart) {
        this.loading = true;
      }else if(event instanceof NavigationEnd) {
        this.loading = false;
      }

      window.scrollTo(0, 0);
    });
  }
}
