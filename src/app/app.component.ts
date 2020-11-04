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
  // set metadata variables
  baseUrl = window.location.origin;
  metaImage= window.location.origin + "/assets/icons/apple-touch-icon-180x180.png";

  schema = [{
      "@context": "http://schema.org",
      "@type": "WebSite",
      "@id": this.baseUrl + "#website",
      "url": this.baseUrl,
      "name": "X-Cash Delegates Explorer",
      "alternateName": "Delegates Explorer",
      "headline": "X-Cash Delegates Explorer for DPoPs nodes.",
      "image": this.metaImage,
      "inLanguage": "en",
      "description": "X-Cash Delegates Explorer for DPoPs nodes. Check delegates, their votes, statistics and blocks Information.",
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
        "@id":"#header",
        "name": "Dashboard",
        "url": this.baseUrl + "/dashboard"
      },
      {
        "@context": "https://schema.org",
        "@type":"SiteNavigationElement",
        "@id":"#header",
        "name": "Delegates",
        "url": this.baseUrl + "/delegates"
      },
      {
        "@context": "https://schema.org",
        "@type":"SiteNavigationElement",
        "@id":"#header",
        "name": "Statistics",
        "url": this.baseUrl + "/statistics"
      },
      {
        "@context": "https://schema.org",
        "@type":"SiteNavigationElement",
        "@id":"#header",
        "name": "Help",
        "url": this.baseUrl + "/help"
      },
      {
        "@context": "https://schema.org",
        "@type":"SiteNavigationElement",
        "@id":"#header",
        "name": "API",
        "url": this.baseUrl + "/API"
      }
    ]
  }];

  getRouteAnimation(outlet) {
      return outlet.activatedRouteData.animation
  }

  constructor(private router: Router,  private meta: Meta) {
    // override the route reuse strategy
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    // override default meta tags
    this.meta.updateTag({ property: 'og:url', content: this.baseUrl  });
    this.meta.updateTag({ property: 'og:image', content: this.metaImage  });
    this.meta.updateTag({ name: 'twitter:domain', value: this.baseUrl  });
    this.meta.updateTag({ name: 'twitter:url', value: window.location.href  });
    this.meta.updateTag({ name: 'twitter:image', content: this.metaImage  });

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
