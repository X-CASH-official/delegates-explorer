import {fromEvent as observableFromEvent,  Observable } from 'rxjs';
import {distinctUntilChanged, debounceTime} from 'rxjs/operators';

import { Component, OnInit , ElementRef, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExampleDatabase, ExampleDataSource } from './helpers.data';
import {HttpdataService} from '../../services/http-request.service';
import Swal from 'sweetalert2';
//import { Observable } from 'rxjs';

import { MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-fixed-table',
  templateUrl: './delegates_statistics.component.html',
  styleUrls: ['./delegates_statistics.component.scss']
})
export class delegates_statisticsComponent implements OnInit {

  public dashCard1 = [
    { colorDark: '#1189a5', colorLight: '#fa741c',  colorFont: '#ffffff', ogmeter: false, width_icon: 16.3, text_size: 40, text: 0, suffix: '',  title: 'VOTE COUNT', icon: 'done_all' },
  ];
  public dashCard2 = [
    { colorDark: '#1189a5', colorLight: '#fa741c',  colorFont: '#ffffff', ogmeter: false, width_icon: 33.3, text_size: 36, text: '', suffix: '',  title: 'ONLINE STATUS', icon: 'online_prediction' },
  ];
  public dashCard3 = [
    { colorDark: '#1189a5', colorLight: '#fa741c',  colorFont: '#ffffff', ogmeter: true, width_icon: 33.3, text_size: 40, text: 0, suffix: '',  title: 'DELEGATE RANK ', icon: 'leaderboard' },
    { colorDark: '#1189a5', colorLight: '#fa741c',  colorFont: '#ffffff', ogmeter: true, width_icon: 33.3, text_size: 40, text: 0, suffix: '',  title: 'BLOCKS PRODUCED ', icon: 'find_in_page' },
    { colorDark: '#1189a5', colorLight: '#fa741c',  colorFont: '#ffffff', ogmeter: true, width_icon: 33.3, text_size: 40, text: 0, suffix: '%',  title: 'ONLINE PERCENTAGE', icon: 'update' }
  ];
  public dashCard4 = [
    { colorDark: '#1189a5', colorLight: '#fa741c',  colorFont: '#ffffff', ogmeter: true, width_icon: 33.3, text_size: 40, text: 0, suffix: '%',  title: 'PRODUCER/VERIFIER RATIO', icon: 'star_half' },
    { colorDark: '#1189a5', colorLight: '#fa741c',  colorFont: '#ffffff', ogmeter: true, width_icon: 33.3, text_size: 40, text: 0, suffix: '',  title: 'EST ROUNDS BTW BLOCK PRODUCER ', icon: 'published_with_changes' },
    { colorDark: '#1189a5', colorLight: '#fa741c',  colorFont: '#ffffff', ogmeter: false, width_icon: 33.3, text_size: 40, text: '', suffix: '',  title: 'SINCE LAST BLOCK PRODUCED', icon: 'alarm_on' }
  ];
	public  dashCard5 = [
    { colorDark: '#1189a5', colorLight: '#fa741c',  colorFont: '#ffffff', ogmeter: true, width_icon: 33.3, text_size: 40, text: 0, suffix: '',  title: 'VERIFIERS ONLINE ROUNDS', icon: 'model_training' },
    { colorDark: '#1189a5', colorLight: '#fa741c',  colorFont: '#ffffff', ogmeter: true, width_icon: 33.3, text_size: 40, text: 0, suffix: '',  title: 'VERIFIER ROUNDS', icon: 'autorenew' },
    { colorDark: '#1189a5', colorLight: '#fa741c',  colorFont: '#ffffff', ogmeter: true, width_icon: 33.3, text_size: 40, text: 0, suffix: '',  title: 'PRODUCER ROUNDS', icon: 'find_replace' }
  ];

  title:string = "Delegates Statistics";
  delegate_name:string = "";

  public displayedColumns = ['id', 'block_height'];
	public exampleDatabase = new ExampleDatabase();
	public dataSource: ExampleDataSource | null;
	public showFilterTableCode;
  last_block_found:number;
  length;

  constructor(private route: ActivatedRoute, private HttpdataService: HttpdataService) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	@ViewChild('filter') filter: ElementRef;


	ngOnInit() {
      this.delegate_name = this.route.snapshot.queryParamMap.get("data");

      // get the data
    	this.HttpdataService.get_request(this.HttpdataService.GET_DELEGATES_STATISTICS + "?parameter1=" + this.delegate_name).subscribe(
  	   (res) =>	{
          this.exampleDatabase = new ExampleDatabase();

          var data = JSON.parse(JSON.stringify(res));
          var block_producer_block_heights = data.block_producer_block_heights.split("|");
          var block_reward;
          let xcash_wallet_decimal_places_amount = this.HttpdataService.XCASH_WALLET_DECIMAL_PLACES_AMOUNT;
          var count = 0;

          for (count = 1; count < block_producer_block_heights.length; count++) {
      	    this.exampleDatabase.addUser((count).toString(),block_producer_block_heights[count].toString(),"Block Producer");
            if (count + 1 == block_producer_block_heights.length)  {
              this.last_block_found = parseInt(block_producer_block_heights[count]);
            }
      	  }


          this.dashCard1[0].text = this.get_lg_numer_format(parseInt(data.total_vote_count) / this.HttpdataService.XCASH_WALLET_DECIMAL_PLACES_AMOUNT);

          this.dashCard2[0].text = data.online_status == 'true' ? 'Online'  : 'Offline';

          this.dashCard3[0].text = parseInt(data.current_delegate_rank);
          this.dashCard3[1].text = block_producer_block_heights.length-1;
          this.dashCard3[2].text = parseInt(data.block_verifier_online_percentage);

          this.dashCard4[0].text = parseInt(data.block_producer_total_rounds) / parseInt(data.block_verifier_total_rounds) * 100;
          this.dashCard4[1].text = parseInt(data.block_verifier_total_rounds) / parseInt(data.block_producer_total_rounds);

          this.dashCard5[0].text = parseInt(data.block_verifier_online_total_rounds);
          this.dashCard5[1].text = parseInt(data.block_verifier_total_rounds);
          this.dashCard5[2].text = parseInt(data.block_producer_total_rounds);

          this.length = block_producer_block_heights.length - 1;
          this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort);

          this.get_delegates_website_statistics();

          //console.log(this.dataSource);
          observableFromEvent(this.filter.nativeElement, 'keyup').pipe(
            debounceTime(150),
            distinctUntilChanged()
          ).subscribe(() => {
              if (!this.dataSource) { return; }
              this.dataSource.filter = this.filter.nativeElement.value;
            }
          );
        },
        (error) => {
          Swal.fire("Error","An error has occured.<br>Get delegates statistics failed.","error");
        }
    	);
    }

    get_delegates_website_statistics()
    {
      this.HttpdataService.get_request(this.HttpdataService.GET_STATISTICS).subscribe(
      (res) =>
      {
        var data = JSON.parse(JSON.stringify(res));
        var minutes_since_last_block_found = ((parseInt(data.current_block_height) - this.last_block_found) * this.HttpdataService.BLOCK_TIME);
        var minutes = minutes_since_last_block_found % 60;
        var hours = (minutes_since_last_block_found-minutes) / 60;
        this.dashCard4[2].text =  "~" + hours.toString() + "h " + (minutes<10?"0":"") + minutes.toString() + "m";
      },
      (error) => {
        Swal.fire("Error","An error has occured.<br>Get delegates website statistics failed.","error");
      });
    }

    get_lg_numer_format(value){
      var exp, suffixes = ['k', 'M', 'B', 't', 'q', 'Q'];
      if (Number.isNaN(value)) { return null; }
      if (value < 1000) { return value; }
      exp = Math.floor(Math.log(value) / Math.log(1000));
      return (value / Math.pow(1000, exp)).toFixed(1) + suffixes[exp - 1];
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
