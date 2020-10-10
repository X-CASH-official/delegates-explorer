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
	  this.HttpdataService.get_request(this.HttpdataService.SERVER_HOSTNAME_AND_PORT_GET_STATISTICS).subscribe(
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
  	     Swal.fire("Error","An error has occured","error");
  	  }
	  );
  }
}
