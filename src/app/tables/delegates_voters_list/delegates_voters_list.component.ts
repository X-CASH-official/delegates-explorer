import { Component, OnInit , ElementRef, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExampleDatabase, ExampleDataSource } from './helpers.data';
import {httpdataservice} from '../../services/http-request.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-fixed-table',
  templateUrl: './delegates_voters_list.component.html',
  styleUrls: ['./delegates_voters_list.component.scss']
})
export class delegates_voters_listComponent implements OnInit {

	public dashCard = [
        { colorDark: '#fa741c', colorLight: '#fb934e', width: 40, text: 0, settings: true, title: 'VOTE COUNT', icon: 'done_all' },
        { colorDark: '#fa741c', colorLight: '#fb934e', width: 40, text: 0, settings: true, title: 'VOTERS', icon: 'how_to_reg' }
    ];

  title:string = "Delegates Voters List";
  delegate_name:string = "";
	total_vote_count:any = 0;
	amount_of_votes:any = 0;
	public_address:string;
	data:any[] = [];
	document_start_count:number = 1;

	public displayedColumns = ['ID', 'public_address_created_reserve_proof', 'total', 'reserve_proof'];
	public exampleDatabase;
	public dataSource: ExampleDataSource | null;
	public showFilterTableCode;


	constructor(private route: ActivatedRoute, private httpdataservice: httpdataservice) { }

	ngOnInit() {
    this.delegate_name = this.route.snapshot.queryParamMap.get("data");

	  // get the data
	  this.httpdataservice.get_request(this.httpdataservice.SERVER_HOSTNAME_AND_PORT_GET_DELEGATES_VOTERS_LIST + "?parameter1=" + this.delegate_name).subscribe(
	  (res) => {
        this.exampleDatabase = new ExampleDatabase();
        var data = JSON.parse(JSON.stringify(res));
  	    this.total_vote_count = 0;
  	    this.amount_of_votes = data.length;
  	    var count = 0;
        var total;
        for (count = 0; count < this.amount_of_votes; count++) {
          total = parseInt(data[count].total) / this.httpdataservice.XCASH_WALLET_DECIMAL_PLACES_AMOUNT;
          this.total_vote_count += parseInt(data[count].total);
          this.exampleDatabase.addUser((count + 1).toString(),data[count].public_address_created_reserve_proof.toString(),total.toString(),data[count].reserve_proof.toString());
  	    }
  	    this.dashCard[0].text = this.total_vote_count / this.httpdataservice.XCASH_WALLET_DECIMAL_PLACES_AMOUNT;
  	    this.dashCard[1].text = this.amount_of_votes;
  	    this.dataSource = new ExampleDataSource(this.exampleDatabase);
      },
      (error) => {
        Swal.fire("Error","An error has occured","error");
      }
	  );
	}

  copyVote(val: string){
   let selBox = document.createElement('textarea');
   selBox.style.position = 'fixed';
   selBox.style.left = '0';
   selBox.style.top = '0';
   selBox.style.opacity = '0';
   selBox.value = val;
   document.body.appendChild(selBox);
   selBox.focus();
   selBox.select();
   document.execCommand('copy');
   document.body.removeChild(selBox);
   Swal.fire("Success","The vote has been copied to the clipboard","success");
 }


}
