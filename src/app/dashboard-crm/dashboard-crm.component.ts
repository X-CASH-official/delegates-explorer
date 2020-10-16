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

    dashCard1 = [
      { colorDark: '#1189a5', colorLight: '#fa741c',  colorFont: '#ffffff', ogmeter: true, width_icon: 20, text_size: 40, text: 0, suffix: '', title: 'PROOF OF STAKE ROUND NUMBER', icon: 'autorenew' },
      { colorDark: '#1189a5', colorLight: '#fa741c',  colorFont: '#ffffff', ogmeter: true, width_icon: 20, text_size: 40, text: 0, suffix: '', title: 'BLOCK HEIGHT', icon: 'assignment' }
    ];

    dashCard2 = [
      { colorDark: '#1189a5', colorLight: '#fa741c',  colorFont: '#ffffff', ogmeter: true, width_icon: 20, text_size: 40, text: 0, suffix: '', title: 'TOTAL BLOCK VERIFIERS', icon: 'verified_user' },
      { colorDark: '#1189a5', colorLight: '#fa741c',  colorFont: '#ffffff', ogmeter: true, width_icon: 20, text_size: 40, text: 0, suffix: '', title: 'TOTAL DELEGATES', icon: 'groups' }

    ];
    dashCard3 = [
      { colorDark: '#1189a5', colorLight: '#fa741c',  colorFont: '#ffffff', ogmeter: true, width_icon: 20, text_size: 40, text: 0, suffix: 'XCA', title: 'TOTAL VOTES', icon: 'done_all' },
      { colorDark: '#1189a5', colorLight: '#fa741c',  colorFont: '#ffffff', ogmeter: true, width_icon: 20, text_size: 40, text: 0, suffix: 'XCA', title: 'AVERAGE DELEGATE TOTAL VOTE', icon: 'signal_cellular_null' }

    ];

    dashCard4 = [
      { colorDark: '#1189a5', colorLight: '#fa741c',  colorFont: '#ffffff', ogmeter: true, width_icon: 20, text_size: 40, text: 0, suffix: '%', title: 'PoS CIRCULATING', icon: 'pie_chart' },
      { colorDark: '#1189a5', colorLight: '#fa741c',  colorFont: '#ffffff', ogmeter: false, width_icon: 20, text_size: 40, text: '', title: 'NEXT RECALCULATING OF VOTES', icon: 'hourglass_empty' }
    ];


    constructor(private HttpdataService: HttpdataService) { }

    ngOnInit() {
      // get the data
  	  this.HttpdataService.get_request(this.HttpdataService.SERVER_HOSTNAME_AND_PORT_GET_STATISTICS).subscribe(
    	  (res) => {
          var data = JSON.parse(JSON.stringify(res));
          this.dashCard1[0].text = data.XCASH_DPOPS_round_number;
          this.dashCard1[1].text = data.current_block_height;
          this.dashCard3[0].text = parseInt(data.total_votes) / this.HttpdataService.XCASH_WALLET_DECIMAL_PLACES_AMOUNT;
          this.dashCard4[0].text = data.XCASH_DPOPS_circulating_percentage;

          this.circulating_percentage = parseInt(data.XCASH_DPOPS_circulating_percentage);
    	  },
    	  (error) =>  {
    	    Swal.fire("Error","An error has occured","error");
    	  }
  	  );

      this.dashCard2[0].text = 50;

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

      this.get_delegates();

    }

    get_delegates()
    {
      // get the data
      this.HttpdataService.get_request(this.HttpdataService.SERVER_HOSTNAME_AND_PORT_GET_DELEGATES).subscribe(
        (res) => {
          //this.exampleDatabase = new ExampleDatabase();
          let data = JSON.parse(JSON.stringify(res));
          let count = 0;
          let delegate_total_vote_count;
          let current_delegate_total_vote_count;
          let xcash_wallet_decimal_places_amount = this.HttpdataService.XCASH_WALLET_DECIMAL_PLACES_AMOUNT;

          this.dashCard2[1].text = data.length;

          for (count = 0, delegate_total_vote_count = 0; count < data.length; count++)
          {
            current_delegate_total_vote_count = parseInt(data[count].total_vote_count) / xcash_wallet_decimal_places_amount;
            delegate_total_vote_count += current_delegate_total_vote_count;
          }

          // only use 45 to calculate this since there are no votes for the 5 seed nodes
          this.dashCard3[1].text = delegate_total_vote_count / 45;
        },
        (error) => {
          Swal.fire("Error","An error has occured","error");
        }
      );
    }



}
