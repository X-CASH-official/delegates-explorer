import { Component, OnInit } from '@angular/core';
//import {httpdataservice} from '../services/http-request.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-help',
    templateUrl: './help.component.html',
    styleUrls: ['./help.component.scss']
})

export class HelpComponent implements OnInit {
    delegatestatistics:string;
    delegateprofileinformation:string;
    public dashCard1 = [
        { colorDark: '#fa741c', colorLight: '#fb934e', width: 40, text: 0, settings: true, title: 'PROOF OF STAKE ROUND NUMBER', icon: 'autorenew' },
        { colorDark: '#fa741c', colorLight: '#fb934e', width: 40, text: 0, settings: true, title: 'BLOCK HEIGHT', icon: 'assignment' }
    ];

        public dashCard2 = [
        { colorDark: '#fa741c', colorLight: '#fb934e', width: 40, text: 0, settings: true, title: 'TOTAL VOTES', icon: 'done_all' },
        { colorDark: '#fa741c', colorLight: '#fb934e', width: 40, text: 0, settings: true, title: 'PROOF OF STAKE CIRCULATING PERCENTAGE', icon: 'pie_chart' }
    ];

    constructor() { }

    ngOnInit() {
          // get the data
	  // this.httpdataservice.get_request(this.httpdataservice.SERVER_HOSTNAME_AND_PORT_GET_STATISTICS).subscribe(
	  // (res) =>
	  // {
    //         var data = JSON.parse(JSON.stringify(res));
    //         this.dashCard1[0].text = data.XCASH_DPOPS_round_number;
    //         this.dashCard1[1].text = data.current_block_height;
    //         this.dashCard2[0].text = parseInt(data.total_votes) / this.httpdataservice.XCASH_WALLET_DECIMAL_PLACES_AMOUNT;
    //         this.dashCard2[1].text = data.XCASH_DPOPS_circulating_percentage;
	  // },
	  // (error) =>
    //       {
	  //   Swal.fire("Error","An error has occured","error");
	  // }
	  // );
    }

}
