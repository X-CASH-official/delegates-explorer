import { Component, OnInit , ElementRef, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExampleDatabase, ExampleDataSource } from './helpers.data';
import {HttpdataService} from '../../services/http-request.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-fixed-table',
  templateUrl: './delegates_statistics.component.html',
  styleUrls: ['./delegates_statistics.component.scss']
})
export class delegates_statisticsComponent implements OnInit {

  public dashCard1 = [
        { colorDark: '#fa741c', colorLight: '#fb934e',  colorFont: '#ffffff', ogmeter: true, width_icon: 20, text_size: 40, text: 0, suffix: '',  title: 'VOTE COUNT', icon: 'done_all' },
        { colorDark: '#fa741c', colorLight: '#fb934e',  colorFont: '#ffffff', ogmeter: true, width_icon: 20, text_size: 40, text: 0, suffix: '',  title: 'DELEGATE RANK', icon: 'leaderboard' }
    ];
	public dashCard2 = [
        { colorDark: '#fa741c', colorLight: '#fb934e',  colorFont: '#ffffff', ogmeter: true, width_icon: 20, text_size: 40, text: 0, suffix: '',  title: 'VERIFIER ROUNDS', icon: 'autorenew' },
        { colorDark: '#fa741c', colorLight: '#fb934e',  colorFont: '#ffffff', ogmeter: true, width_icon: 20, text_size: 40, text: 0, suffix: '',  title: 'PRODUCER ROUNDS', icon: 'find_replace' }
    ];

  title:string = "Delegates Statistics";
  delegate_name:string = "";

  //public displayedColumns = ['id', 'block_height', 'block_hash', 'block_date_and_time', 'block_reward'];
  public displayedColumns = ['id', 'block_height'];
	public exampleDatabase = new ExampleDatabase();
	public dataSource: ExampleDataSource | null;
	public showFilterTableCode;

  constructor(private route: ActivatedRoute, private HttpdataService: HttpdataService) { }

	ngOnInit() {
      this.delegate_name = this.route.snapshot.queryParamMap.get("data");

      // get the data
    	this.HttpdataService.get_request(this.HttpdataService.SERVER_HOSTNAME_AND_PORT_GET_DELEGATES_STATISTICS + "?parameter1=" + this.delegate_name).subscribe(
    	   (res) =>	{
          this.exampleDatabase = new ExampleDatabase();

          var data = JSON.parse(JSON.stringify(res));
          var block_producer_block_heights = data.block_producer_block_heights.split("|");
          var block_reward;
          let xcash_wallet_decimal_places_amount = this.HttpdataService.XCASH_WALLET_DECIMAL_PLACES_AMOUNT;

          var count = block_producer_block_heights.length -1;

      	  for (count; count > 0; count--) {
            console.log(count);

      	    this.exampleDatabase.addUser((count).toString(),block_producer_block_heights[count].toString(),"Block Producer");

            // var data2 = this.HttpdataService.get_request(this.HttpdataService.SERVER_HOSTNAME_AND_PORT_GET_ROUND_STATISTICS + "?parameter1=" + block_producer_block_heights[count]);
            // var data2 = JSON.parse(JSON.stringify(data2));
            // console.log("data2= " + data2);
            //
            // block_reward = '' //parseInt(data[count].block_reward) / xcash_wallet_decimal_places_amount;
            // this.exampleDatabase.addUser((count).toString(), data2[count].block_producer_block_heights[count].toString(), data2[count].block_hash.toString(), (parseInt(data2[count].block_date_and_time) * 1000).toString(), block_reward.toString());
      	  }

      	  this.dashCard1[0].text = data.total_vote_count / this.HttpdataService.XCASH_WALLET_DECIMAL_PLACES_AMOUNT;
      	  this.dashCard1[1].text = data.current_delegate_rank;
      	  this.dashCard2[0].text = data.block_verifier_total_rounds;
      	  this.dashCard2[1].text = data.block_producer_total_rounds;
      	  this.dataSource = new ExampleDataSource(this.exampleDatabase);
          //console.log(this.dataSource);

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
