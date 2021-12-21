import {fromEvent as observableFromEvent } from 'rxjs';
import {distinctUntilChanged, debounceTime} from 'rxjs/operators';

import { Component, OnInit , ElementRef, ViewChild } from '@angular/core';
import { DelegateDatabase, DelegateDataSource } from './helpers.data';
import {HttpdataService} from '../../services/http-request.service';
import { FunctionsService } from '../../services/functions.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Title } from '@angular/platform-browser';


import Swal from 'sweetalert2';
import {MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltipDefaultOptions} from '@angular/material/tooltip';
import { environment } from './../../../environments/environment';

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
  filter_active = '';
  seedNodes;


	constructor(private httpdataservice: HttpdataService, private titleService:Title, public functionsService: FunctionsService) {
      this.titleService.setTitle(" Delegates List - " + environment.shortTitle + " - X-CASH");
   }


	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	@ViewChild('filter') filter: ElementRef;

  getRouteAnimation(outlet) {
     return outlet.activatedRouteData.animation;
  }


  ngOnInit() {

    if (window.innerWidth < 900) { // 768px portrait
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
          mode = data[count].shared_delegate_status == 'solo' ? 'Solo' : data[count].shared_delegate_status == 'shared' ? 'Shared' : 'Group';
  	      this.exampleDatabase.addUser((count + 1).toString(),data[count].delegate_name.toString(),status,mode,data[count].delegate_fee.toString(),data[count].block_verifier_total_rounds.toString(),data[count].block_verifier_online_percentage.toString(),current_delegate_total_vote_count.toString(),data[count].block_producer_total_rounds.toString());

  	    }

        this.seedNodes = environment.seedNodes;

        // paginator settings
        this.length = data.length;
        this.pagesize = 100;

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
        Swal.fire({
            title: "Error",
            html: "An error has occured:<br>API: Get delegates failed.",
            icon: "error",
            position: 'bottom',
            timer: 2500
          });
  	  }
    );
  }


  filterMode(value) {
    this.dataSource.filter = value;
    this.filter_active = value;
    console.log(value);
    console.log(this.filter_active);
  }



}
