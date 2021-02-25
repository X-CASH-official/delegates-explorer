import {fromEvent as observableFromEvent} from 'rxjs';
import {distinctUntilChanged, debounceTime} from 'rxjs/operators';

import { Component, OnInit , ElementRef, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExampleDatabase, ExampleDataSource } from './helpers.data';
import {HttpdataService} from '../../services/http-request.service';
import { FunctionsService } from '../../services/functions.service';
import Swal from 'sweetalert2';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-fixed-table',
  templateUrl: './delegates_voters_list.component.html',
  styleUrls: ['./delegates_voters_list.component.scss']
})
export class Delegates_voters_listComponent implements OnInit {

	public dashCard = [
        { ogmeter: true, width_icon: 20, text_size: 40, text: 0, suffix: '', title: 'VOTE COUNT', icon: 'done_all' },
        { ogmeter: true, width_icon: 20, text_size: 40, text: 0, suffix: '', title: 'VOTERS', icon: 'how_to_reg' }
    ];

  title:string = "Delegates Voters List";
  delegate_name:string = "";
	total_vote_count:any = 0;
	amount_of_votes:any = 0;
	public_address:string;
	data:any[] = [];
	document_start_count:number = 1;

	public displayedColumns = ['id', 'total', 'public_address_created_reserve_proof', 'reserve_proof'];
	public exampleDatabase;
	public dataSource: ExampleDataSource | null;
	public showFilterTableCode;
  length;
  is_seednode:boolean = false;

	constructor(private route: ActivatedRoute, private httpdataservice: HttpdataService, public functionsService: FunctionsService) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	@ViewChild('filter') filter: ElementRef;

	ngOnInit() {
    this.delegate_name = this.route.snapshot.queryParamMap.get("data");
    if (this.delegate_name .includes('_xcash_foundation')) {
      this.is_seednode = true;
    }
	  // get the data
	  this.httpdataservice.get_request(this.httpdataservice.GET_DELEGATES_VOTERS_LIST + "?parameter1=" + this.delegate_name).subscribe(
	  (res) => {
        this.exampleDatabase = new ExampleDatabase();
        var data = JSON.parse(JSON.stringify(res));
  	    this.total_vote_count = 0;
  	    this.amount_of_votes = data.length;
        let xcash_wallet_decimal_places_amount = this.httpdataservice.XCASH_WALLET_DECIMAL_PLACES_AMOUNT;
  	    var count = 0;
        var total;

        for (count = 0; count < this.amount_of_votes; count++) {
          total = parseInt(data[count].total) / xcash_wallet_decimal_places_amount;
          this.total_vote_count += parseInt(data[count].total);
          this.exampleDatabase.addUser((count + 1).toString(), total.toString(), data[count].public_address_created_reserve_proof.toString(), data[count].reserve_proof.toString());
  	    }

  	    this.dashCard[0].text = this.total_vote_count / xcash_wallet_decimal_places_amount;
  	    this.dashCard[1].text = this.amount_of_votes;

        this.length = this.amount_of_votes;
        this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort);

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
        Swal.fire("Error","An error has occured:<br>API: Get delegates voters list failed.","error");
      }
	  );
	}


}
