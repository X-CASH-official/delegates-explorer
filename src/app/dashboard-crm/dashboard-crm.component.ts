import { Component, OnInit } from '@angular/core';
import {HttpdataService} from '../services/http-request.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-dashboard-crm',
    templateUrl: './dashboard-crm.component.html',
    styleUrls: ['./dashboard-crm.component.scss']
})

export class DashboardCrmComponent implements OnInit {
    delegatestatistics:string;
    delegateprofileinformation:string;
    circulating_percentage;
    top10Producer;
    top10Verifier;
    top10Ratio;

    dashCard1 = [
        { colorDark: '#fa741c', colorLight: '#fb934e', width: 20, text: 0, settings: true, title: 'PROOF OF STAKE ROUND NUMBER', icon: 'autorenew' },
        { colorDark: '#fa741c', colorLight: '#fb934e', width: 20, text: 0, settings: true, title: 'BLOCK HEIGHT', icon: 'assignment' }
    ];

    dashCard2 = [
        { colorDark: '#fa741c', colorLight: '#fb934e', width: 20, text: 0, settings: true, title: 'TOTAL VOTES', icon: 'done_all' },
        { colorDark: '#fa741c', colorLight: '#fb934e', width: 20, text: 0, settings: true, title: 'PoS CIRCULATING %', icon: 'pie_chart' }
    ];
    dashCard3 = [
          { colorDark: '#fa741c', colorLight: '#fb934e', width: 20, text: 0, settings: true, title: 'TOTAL BLOCK VERIFIERS', icon: 'verified_user' },
          { colorDark: '#fa741c', colorLight: '#fb934e', width: 20, text: 0, settings: true, title: 'TOTAL DELEGATES', icon: 'groups' }
      ];

    dashCard4 = [
          { colorDark: '#fa741c', colorLight: '#fb934e', width: 20, text: 0, settings: true, title: 'AVERAGE DELEGATE TOTAL VOTE', icon: 'signal_cellular_null' },
          { colorDark: '#fa741c', colorLight: '#fb934e', width: 20, text_settings: 20, text: '', settings: false, title: 'NEXT RECALCULATING OF VOTES', icon: 'hourglass_empty' }
      ];


    constructor(private HttpdataService: HttpdataService) { }

    ngOnInit() {
      // get the data
  	  this.HttpdataService.get_request(this.HttpdataService.SERVER_HOSTNAME_AND_PORT_GET_STATISTICS).subscribe(
    	  (res) => {
                var data = JSON.parse(JSON.stringify(res));
                this.dashCard1[0].text = data.XCASH_DPOPS_round_number;
                this.dashCard1[1].text = data.current_block_height;
                this.dashCard2[0].text = parseInt(data.total_votes) / this.HttpdataService.XCASH_WALLET_DECIMAL_PLACES_AMOUNT;
                this.dashCard2[1].text = data.XCASH_DPOPS_circulating_percentage;

                this.circulating_percentage = parseInt(data.XCASH_DPOPS_circulating_percentage);
    	  },
    	  (error) =>  {
    	    Swal.fire("Error","An error has occured","error");
    	  }
  	  );

      this.dashCard3[0].text = 50;

      setInterval(() => {
          var current_date_and_time = new Date();
          var minutes:any = (60 - current_date_and_time.getMinutes() - 1) % 60;
          var seconds:any = 60 - current_date_and_time.getSeconds() - 1;
          if (minutes < 10) {
            minutes = "0" + minutes.toString();
          }
          if (seconds < 10) {
            seconds = "0" + seconds;
          }
          this.dashCard4[1].text = minutes + ":" + seconds;
      }, 1000);

    }

}
