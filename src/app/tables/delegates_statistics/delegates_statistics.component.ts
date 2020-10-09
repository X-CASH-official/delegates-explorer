import { Component, OnInit , ElementRef, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExampleDatabase, ExampleDataSource } from './helpers.data';
import {httpdataservice} from '../../services/http-request.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-fixed-table',
  templateUrl: './delegates_statistics.component.html',
  styleUrls: ['./delegates_statistics.component.scss']
})
export class delegates_statisticsComponent implements OnInit {

  public dashCard1 = [
        { colorDark: '#fa741c', colorLight: '#fb934e', width: 40, text: 0, settings: true, title: 'VOTE COUNT', icon: 'done_all' },
        { colorDark: '#fa741c', colorLight: '#fb934e', width: 40, text: 0, settings: true, title: 'DELEGATE RANK', icon: 'leaderboard' }
    ];
	public dashCard2 = [
        { colorDark: '#fa741c', colorLight: '#fb934e', width: 40, text: 0, settings: true, title: 'VERIFIER ROUNDS', icon: 'autorenew' },
        { colorDark: '#fa741c', colorLight: '#fb934e', width: 40, text: 0, settings: true, title: 'PRODUCER ROUNDS', icon: 'find_replace' }
    ];

  title:string = "Delegates Statistics";
  delegate_name:string = "";

  public displayedColumns = ['id', 'block_height', 'block_hash', 'block_date_and_time', 'block_reward'];
	public exampleDatabase = new ExampleDatabase();
	public dataSource: ExampleDataSource | null;
	public showFilterTableCode;

  constructor(private route: ActivatedRoute, private httpdataservice: httpdataservice) { }

	ngOnInit() {
      this.delegate_name = this.route.snapshot.queryParamMap.get("data");

      // get the data
    	this.httpdataservice.get_request(this.httpdataservice.SERVER_HOSTNAME_AND_PORT_GET_DELEGATES_STATISTICS + "?parameter1=" + this.delegate_name).subscribe(
    	   (res) =>	{
          this.exampleDatabase = new ExampleDatabase();
          var data = JSON.parse(JSON.stringify(res));
          var block_producer_block_heights = data.block_producer_block_heights.split("|");
          var count = 0;
      	  for (count = 1; count < block_producer_block_heights.length; count++) {
      	    this.exampleDatabase.addUser((count).toString(),block_producer_block_heights[count].toString(),"Block Producer");
      	  }
      	  this.dashCard1[0].text = data.total_vote_count / this.httpdataservice.XCASH_WALLET_DECIMAL_PLACES_AMOUNT;
      	  this.dashCard1[1].text = data.current_delegate_rank;
      	  this.dashCard2[0].text = data.block_verifier_total_rounds;
      	  this.dashCard2[1].text = data.block_producer_total_rounds;
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
