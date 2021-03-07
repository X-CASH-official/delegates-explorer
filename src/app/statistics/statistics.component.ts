import { Component, OnInit } from '@angular/core';
import {HttpdataService} from '../services/http-request.service';
import Swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';

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
    delegate_most_total_rounds;

    public dashCard1 = [
        { colorDark: '#fa741c', colorLight: '#fb934e', width: 20, text_settings: 20, text: '', settings: false, title: 'MOST BLOCK PRODUCER TOTAL ROUNDS', icon: 'emoji_events' },
        { colorDark: '#fa741c', colorLight: '#fb934e', width: 20, text_settings: 20, text: '', settings: false, title: 'MOST TOTAL ROUNDS', icon: 'military_tech' }
    ];

    public dashCard2 = [
        { colorDark: '#fa741c', colorLight: '#fb934e', width: 20, text: 0, settings: true, title: 'MOST BLOCK PRODUCER TOTAL ROUNDS', icon: 'find_replace' },
        { colorDark: '#fa741c', colorLight: '#fb934e', width: 20, text: 0, settings: true, title: 'MOST TOTAL ROUNDS', icon: 'model_training' }
    ];

    constructor(private httpdataservice: HttpdataService, private titleService:Title) {
        this.titleService.setTitle(" Statistics - Delegates Explorer - X-CASH");
     }

    ngOnInit() {
          // get the data
  	  this.httpdataservice.get_request(this.httpdataservice.GET_STATISTICS).subscribe(
    	  (res) => {
          var data = JSON.parse(JSON.stringify(res));
            this.most_block_producer_total_rounds_delegate_name = data.most_block_producer_total_rounds_delegate_name;
            //this.most_total_rounds_delegate_name = data.most_total_rounds_delegate_name;
            this.most_block_producer_total_rounds = data.most_block_producer_total_rounds;
            this.most_total_rounds = data.most_total_rounds;
      	  },
      	  (error) =>  {
             Swal.fire({
                 title: "Error",
                 html: "An error has occured:<br>API: Get statistics failed.",
                 icon: "error",
                 position: 'bottom',
                 timer: 2500
               });
      	  }
       );

       this.get_delegates_stats();
    }


    get_delegates_stats() {
      // get the data
   	  this.httpdataservice.get_request(this.httpdataservice.GET_DELEGATES).subscribe(
     	  (res) =>  {
            let data = JSON.parse(JSON.stringify(res));

            var result = data.filter(function(d) {
              var delegate = d.delegate_name;
              return !(delegate.includes('us1_xcash_foundation'))
                    || !(delegate.includes('europe1_xcash_foundation'))
                    || !(delegate.includes('europe2_xcash_foundation'))
                    || !(delegate.includes('europe3_xcash_foundation'))
                    || !(delegate.includes('oceania1_xcash_foundation'))
            });


            let count = 0;
            let top_count = 25;
            // Top Block Producer List
            this.top_producer = [...result].sort(function(a, b) {
              return b.block_producer_total_rounds - a.block_producer_total_rounds;
            }).slice( 0, top_count);

            // Top Block Verifier List
            this.top_verifier = [...result].sort(function(a, b) {
              return b.block_verifier_total_rounds - a.block_verifier_total_rounds;
            }).slice( 0, top_count);

            this.most_total_rounds_delegate_name =  this.top_verifier[0]['delegate_name'];
            this.delegate_most_total_rounds =  this.top_verifier[0]['block_verifier_total_rounds'];

            // Top Block Ratio List
            [...result].forEach(function(item) {
               item.block_ratio = item.block_producer_total_rounds / item.block_verifier_total_rounds * 100;
            });
            this.top_ratio = result.sort(function(a, b) {
              return b.block_ratio - a.block_ratio;
            }).slice( 0, top_count);

            var top_ratio_delegate = this.top_ratio[0];
            this.top_ratio_delegate_name = top_ratio_delegate.delegate_name;
            this.top_ratio_block_ratio = Number.isNaN(top_ratio_delegate.block_ratio) ? "0" : top_ratio_delegate.block_ratio;

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

}
