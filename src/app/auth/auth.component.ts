
import { Component, OnInit ,Input} from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { environment } from './../../environments/environment';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']

})

export class AuthComponent implements OnInit{
  @Input() isVisible : boolean = true;
  visibility = 'shown';

  sideNavOpened: boolean = true;
  matDrawerOpened: boolean = false;
  matDrawerShow: boolean = true;
  sideNavMode: string = 'side';
  shortTitle;


  ngOnChanges() {
   this.visibility = this.isVisible ? 'shown' : 'hidden';
  }

	constructor(private media: MediaObserver) { }

	ngOnInit() {
		    /*this.media.subscribe((mediaChange: MediaChange) => {
            this.toggleView();
        });*/
        this.shortTitle = environment.shortTitle;
	}

  getRouteAnimation(outlet) {
     return outlet.activatedRouteData.animation;
  }

	toggleView() {
		if (this.media.isActive('gt-md')) {
        this.sideNavMode = 'side';
        this.sideNavOpened = true;
        this.matDrawerOpened = false;
        this.matDrawerShow = true;
    } else if(this.media.isActive('gt-xs')) {
        this.sideNavMode = 'side';
        this.sideNavOpened = false;
        this.matDrawerOpened = true;
        this.matDrawerShow = true;
    } else if (this.media.isActive('lt-sm')) {
        this.sideNavMode = 'over';
        this.sideNavOpened = false;
        this.matDrawerOpened = false;
        this.matDrawerShow = false;
    }
	}
}
