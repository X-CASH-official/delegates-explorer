import {fromEvent as observableFromEvent } from 'rxjs';
import {distinctUntilChanged, debounceTime} from 'rxjs/operators';

import { Component, OnInit , ElementRef, ViewChild } from '@angular/core';
import { DelegateDatabase, DelegateDataSource } from './helpers.data';
import {HttpdataService} from '../../services/http-request.service';
import { MatPaginator, MatSort } from '@angular/material';
import { Title } from '@angular/platform-browser';

import Swal from 'sweetalert2';
import {MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltipDefaultOptions} from '@angular/material/tooltip';

/** Custom options the configure the tooltip's default show/hide delays. */
export const myCustomTooltipDefaults: MatTooltipDefaultOptions = {
  showDelay: 500,
  hideDelay: 500,
  touchendHideDelay: 750,
};

@Component({
  selector: 'app-fixed-table',
  templateUrl: './delegates.component.html',
  styleUrls: ['./delegates.component.scss'],
  providers: [
    {provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: myCustomTooltipDefaults}
  ],
})

export class DelegatesComponent implements OnInit {

	displayedColumns = ['id', 'delegate_name', 'online_status', 'shared_delegate_status', 'delegate_fee', 'total_vote_count', 'block_verifier_online_percentage', 'block_verifier_total_rounds', 'block_producer_total_rounds'];
	exampleDatabase = new DelegateDatabase();
	dataSource: DelegateDataSource | null;
	showFilterTableCode;
  length;
  pagesize;
  mobile = false;


	constructor(private httpdataservice: HttpdataService, private titleService:Title) {
      this.titleService.setTitle(" Delegates List - Delegates Explorer - X-CASH");
   }


	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	@ViewChild('filter') filter: ElementRef;

  //
  // const columnDefinitions = [
  //   { def: 'id', showMobile: true },
  //   { def: 'delegate_name', showMobile: true },
  //   { def: 'online_status', showMobile: true },
  //   { def: 'shared_delegate_status', showMobile: true },
  //   { def: 'delegate_fee', showMobile: true },
  //   { def: 'total_vote_count', showMobile: true },
  //   { def: 'block_verifier_online_percentage', showMobile: false },
  //   { def: 'block_verifier_total_rounds', showMobile: false },
  //   { def: 'block_producer_total_rounds', showMobile: true },
  // ];
  //
  // getDisplayedColumns(): string[] {
  //   const isMobile = this.currentDisplay === 'mobile';
  //   console.log(isMobile);
  //
  //   return this.columnDefinitions
  //     .filter(cd => !isMobile || cd.showMobile)
  //     .map(cd => cd.def);
  // }


  getRouteAnimation(outlet) {
     return outlet.activatedRouteData.animation;
  }


  ngOnInit() {

    if (window.screen.width < 800) { // 768px portrait
      this.mobile = true;
    }


    this.get_delegates();
  }


	get_delegates() {
    // get the data
	  this.httpdataservice.get_request(this.httpdataservice.GET_DELEGATES).subscribe(
  	  (res) => {
        this.exampleDatabase = new DelegateDatabase();
        let data = JSON.parse(JSON.stringify(res));
  	    let count = 0;
        let current_delegate_total_vote_count;
        let mode;
        let status;
        let xcash_wallet_decimal_places_amount = this.httpdataservice.XCASH_WALLET_DECIMAL_PLACES_AMOUNT;

  	    for (count = 0; count < data.length; count++) {
          current_delegate_total_vote_count = parseInt(data[count].total_vote_count) / xcash_wallet_decimal_places_amount;
          status = data[count].online_status == 'true' ? 'Online'  : 'Offline';
          mode = data[count].shared_delegate_status == 'true' ? 'Shared'  : 'Solo';
  	      this.exampleDatabase.addUser((count + 1).toString(),data[count].delegate_name.toString(),status,mode,data[count].delegate_fee.toString(),data[count].block_verifier_total_rounds.toString(),data[count].block_verifier_online_percentage.toString(),current_delegate_total_vote_count.toString(),data[count].block_producer_total_rounds.toString());

  	    }

        // paginator settings
        this.length = data.length;
        this.pagesize = 50;

        this.dataSource = new DelegateDataSource(this.exampleDatabase, this.paginator, this.sort);


        observableFromEvent(this.filter.nativeElement, 'keyup').pipe(
          debounceTime(150),
          distinctUntilChanged(),)
          .subscribe(() => {
            if (!this.dataSource) { return; }
            this.dataSource.filter = this.filter.nativeElement.value;
          }
        );
  	  },
  	  (error) => {
  	    Swal.fire("Error","An error has occured:<br>API: Get delegates failed.","error");
  	  }
    );
  }

  get_lg_numer_format(value){
    var exp, suffixes = ['k', 'M', 'B', 't', 'q', 'Q'];
    if (Number.isNaN(value)) { return null; }
    if (value < 1000) { return value; }
    exp = Math.floor(Math.log(value) / Math.log(1000));
    return (value / Math.pow(1000, exp)).toFixed(1) + suffixes[exp - 1];
  }


}
