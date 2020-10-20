import { Component, OnInit } from '@angular/core';
import {HttpdataService} from '../services/http-request.service';
import Swal from 'sweetalert2';


@Component({
    selector: 'app-statistics',
    templateUrl: './statistics.component.html',
    styleUrls: ['./statistics.component.scss']
})

export class statisticsComponent implements OnInit {

    public_address:string;
    delegatestatistics:string;
    delegateprofileinformation:string;
    most_block_producer_total_rounds_delegate_name:string;
    most_total_rounds_delegate_name:string;
    most_block_producer_total_rounds:number;
    most_total_rounds:number;
    top_producer;
    top_verifier;
    top_ratio;
    ratio_data;
    top_ratio_delegate_name;
    top_ratio_block_ratio;

    public dashCard1 = [
        { colorDark: '#fa741c', colorLight: '#fb934e', width: 20, text_settings: 20, text: '', settings: false, title: 'MOST BLOCK PRODUCER TOTAL ROUNDS', icon: 'emoji_events' },
        { colorDark: '#fa741c', colorLight: '#fb934e', width: 20, text_settings: 20, text: '', settings: false, title: 'MOST TOTAL ROUNDS', icon: 'military_tech' }
    ];

    public dashCard2 = [
        { colorDark: '#fa741c', colorLight: '#fb934e', width: 20, text: 0, settings: true, title: 'MOST BLOCK PRODUCER TOTAL ROUNDS', icon: 'find_replace' },
        { colorDark: '#fa741c', colorLight: '#fb934e', width: 20, text: 0, settings: true, title: 'MOST TOTAL ROUNDS', icon: 'model_training' }
    ];

    constructor(private HttpdataService: HttpdataService) { }

    ngOnInit() {
          // get the data
  	  this.HttpdataService.get_request(this.HttpdataService.GET_STATISTICS).subscribe(
    	  (res) => {
          var data = JSON.parse(JSON.stringify(res));
            // this.dashCard1[0].text = data.most_block_producer_total_rounds_delegate_name;
            // this.dashCard1[1].text = data.most_total_rounds_delegate_name;
            // this.dashCard2[0].text = data.most_block_producer_total_rounds;
            // this.dashCard2[1].text = data.most_total_rounds;

            this.most_block_producer_total_rounds_delegate_name = data.most_block_producer_total_rounds_delegate_name;
            this.most_total_rounds_delegate_name = data.most_total_rounds_delegate_name;
            this.most_block_producer_total_rounds = data.most_block_producer_total_rounds;
            this.most_total_rounds = data.most_total_rounds;
      	  },
      	  (error) =>  {
      	     Swal.fire("Error","An error has occured.<br/>Get statistics failed.","error");
      	  }
       );

       this.get_delegates_stats();
    }


    get_delegates_stats() {
      // get the data
   	  this.HttpdataService.get_request(this.HttpdataService.GET_DELEGATES).subscribe(
     	  (res) =>  {
            let data = JSON.parse(JSON.stringify(res));
            let count = 0;
            let top_count = 25;
            let xcash_wallet_decimal_places_amount = this.HttpdataService.XCASH_WALLET_DECIMAL_PLACES_AMOUNT;

            this.top_producer = data.sort(function(a, b) {
              return b.block_producer_total_rounds - a.block_producer_total_rounds;
            }).slice( 0, top_count);

            this.top_verifier = data.sort(function(a, b) {
              return b.block_verifier_total_rounds - a.block_verifier_total_rounds;
            }).slice( 0, top_count);

            data.map(function(item) {
               item.block_ratio = item.block_producer_total_rounds / item.block_verifier_total_rounds * 100;
            });
            this.top_ratio = data.sort(function(a, b) {
              return b.block_ratio - a.block_ratio;
            }).slice( 0, top_count);

            var top_ratio_delegate = this.top_ratio[0];
            this.top_ratio_delegate_name = top_ratio_delegate.delegate_name;
            this.top_ratio_block_ratio = Number.isNaN(top_ratio_delegate.block_ratio) ? "0" : top_ratio_delegate.block_ratio;

          },
          (error) => {
            Swal.fire("Error","An error has occured.<br/>Get delegates failed.","error");
          }
        );
      }

}
