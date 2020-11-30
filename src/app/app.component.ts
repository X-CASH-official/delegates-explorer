import { Component, OnInit } from '@angular/core';
import { NavigationStart, NavigationEnd, Router } from '@angular/router';
import { Meta } from '@angular/platform-browser';

import { environment } from './../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})


export class AppComponent {

  loading:boolean = true;
  baseURL:string= environment.baseURL;
  metaImage:string= this.baseURL + "/assets/icons/apple-touch-icon-180x180.png";

  schema = [{
      "@context": "http://schema.org",
      "@type": "WebSite",
      "@id": this.baseURL + "#website",
      "url": this.baseURL,
      "name": "X-Cash Delegates Explorer",
      "alternateName": "Delegates Explorer",
      "headline": "X-Cash Delegates Explorer for DPoPs nodes.",
      "image": this.metaImage,
      "inLanguage": "en",
      "description": "X-Cash Delegates Explorer for DPoPs nodes. Check delegates, votes, statistics and blocks information.",
      "disambiguatingDescription": "Delegates Explorer for X-Cash",
      "isFamilyFriendly": "http://schema.org/True",
      "keywords":[
        "X-Cash", "Delegates","Explorer","Nodes","Statistics", "Votes", "staking", "shared delegates", "solo delegates", "DPoPS", "XCASH" , "blocks Information"
      ],
      "hasPart": [
        {
          "@context": "http://schema.org/",
          "@type": "WPHeader",
          "@id": "#header",
          "cssSelector": "#header"
        },
        {
          "@context": "http://schema.org/",
          "@type": "WPSidebar",
          "cssSelector": "#sidebar"
        }
      ]
    },
    {
    "@context": "https://schema.org",
    "@graph":
    [
      {
        "@context": "https://schema.org",
        "@type":"SiteNavigationElement",
        "@id":"#sidebar",
        "name": "Dashboard",
        "url": this.baseURL + "/dashboard"
      },
      {
        "@context": "https://schema.org",
        "@type":"SiteNavigationElement",
        "@id":"#sidebar",
        "name": "Delegates",
        "url": this.baseURL + "/delegates"
      },
      {
        "@context": "https://schema.org",
        "@type":"SiteNavigationElement",
        "@id":"#sidebar",
        "name": "Statistics",
        "url": this.baseURL + "/statistics"
      },
      {
        "@context": "https://schema.org",
        "@type":"SiteNavigationElement",
        "@id":"#sidebar",
        "name": "Help",
        "url": this.baseURL + "/help"
      },
      {
        "@context": "https://schema.org",
        "@type":"SiteNavigationElement",
        "@id":"#sidebar",
        "name": "API",
        "url": this.baseURL + "/API"
      }
    ]
  }];

  static storageKey = 'xcash-explorer-theme-preference';

  getRouteAnimation(outlet) {
      return outlet.activatedRouteData.animation
  }

  constructor(private router: Router,  private meta: Meta) {
    // override the route reuse strategy
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    //this.baseURL = environment.baseURL;
    //this.metaImage = this.baseURL + "/assets/icons/apple-touch-icon-180x180.png";
  }

  ngOnInit() {

    this.router.events.subscribe((event) => {

      if(event instanceof NavigationStart) {
        this.loading = true;
      }else if(event instanceof NavigationEnd) {
        this.loading = false;

        //override default meta tags
        this.meta.updateTag({ property: 'og:url', content: this.baseURL  });
        this.meta.updateTag({ property: 'og:image', content: this.metaImage  });
        this.meta.updateTag({ name: 'twitter:domain', value: this.baseURL  });
        this.meta.updateTag({ name: 'twitter:url', value: window.location.href  });
        this.meta.updateTag({ name: 'twitter:image', content: this.metaImage  });
      }

      window.scrollTo(0, 0);
    });

    'xcash-explorer-theme-preference'
    var theme = window.localStorage.getItem('xcash-explorer-theme-preference');
    if (theme) {
      let body = document.getElementsByTagName('body')[0];
      body.classList.remove("dark-theme");   //remove theme class
      body.classList.remove("light-theme");   //remove theme class
      body.classList.remove("unicorn-theme");   //remove theme class
      body.classList.remove("darksea-theme");   //remove theme class
      body.classList.add(theme + "-theme");   //add selected theme
    }

  }
}
