import { Component, OnInit } from '@angular/core';
import { HttpdataService } from '../services/http-request.service';
import { FunctionsService } from '../services/functions.service';
import { Title } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { formatDate } from '@angular/common'

@Component({
    selector: 'app-dashboard-crm',
    templateUrl: './dashboard-crm.component.html',
    styleUrls: ['./dashboard-crm.component.scss']
})


export class DashboardCrmComponent implements OnInit {

    delegatestatistics:string;
    delegateprofileinformation:string;
    circulating_percentage;
    miliseconds_left;
    isMainnet = false;
    mainnet_date_and_time:any;


    public dashCard1 = [
      { ogmeter: false,  width_icon: 25, text_size: 40, text: 0, suffix: '',title: 'NEXT RECALCULATING OF VOTES', icon: 'hourglass_empty' },
      { ogmeter: true,  width_icon: 25, text_size: 40, text: 0, suffix: '', title: 'BLOCK HEIGHT', icon: 'assignment' },
      { ogmeter: true,  width_icon: 25, text_size: 40, text: 0, suffix: '', title: 'TOTAL BLOCK VERIFIERS', icon: 'verified_user' },
      { ogmeter: true,  width_icon: 25, text_size: 40, text: 0, suffix: '', title: 'TOTAL DELEGATES', icon: 'groups' },
      { ogmeter: false,  width_icon: 25, text_size: 40, text: '-', suffix: '', title: 'TOTAL VOTES', icon: 'done_all' },
      { ogmeter: false,  width_icon: 25, text_size: 40, text: 0, suffix: '', title: 'AVERAGE DELEGATE TOTAL VOTE', icon: 'signal_cellular_null' },
      { ogmeter: true,  width_icon: 25, text_size: 40, text: 0, suffix: '%', title: 'PoS CIRCULATING', icon: 'pie_chart' },
      { ogmeter: true,  width_icon: 25, text_size: 40, text: 0, suffix: '', title: 'DPoPS ROUND NUMBER', icon: 'autorenew' },
      { ogmeter: false,  width_icon: 25, text_size: 40, text: 0, suffix: '', title: 'RANK 50 TOTAL VOTE ', icon: 'swap_vert' },
      { ogmeter: false,  width_icon: 25, text_size: 40, text: 0, suffix: '', title: 'BLOCK REWARD ', icon: 'toll' },
      { ogmeter: false,  width_icon: 25, text_size: 40, text: 0, suffix: '', title: 'BLOCK TIME ', icon: 'timelapse' },
      { ogmeter: false,  width_icon: 25, text_size: 40, text: 0, suffix: '', title: 'EST. BLOCK PER DAY ', icon: 'view_week' },
    ];



    constructor(private httpdataservice:HttpdataService, private titleService:Title,  public functionsService: FunctionsService) {
        this.titleService.setTitle("Delegates Explorer - X-CASH");
     }



    ngOnInit() {

      this.get_delegates();
      this.get_statistics();
      this.get_blockheight();



      setInterval(() => {
          var current_date_and_time = new Date();
          var minutes:any = (60 - current_date_and_time.getMinutes() - 1) % 60;
          var seconds:any = 60 - current_date_and_time.getSeconds() - 1;
          this.dashCard1[0].text = ('0' + minutes).slice(-2) + ":" + ('0' + seconds).slice(-2);
      }, 1000);

    }


    get_blockheight() {
      // get the data
      this.httpdataservice.get_request('https://explorer.x-cash.org/getlastblockdata').subscribe(
        (res) => {
          var data = JSON.parse(JSON.stringify(res));

          this.dashCard1[9].text = this.functionsService.get_lg_numer_format(data.block_reward);
          this.dashCard1[10].text = 5 + " min";
          this.dashCard1[11].text = (24*60)/5;

        },
        (error) =>  {
          Swal.fire("Error","An error has occured.<br/>Get blockheight failed.","error");
        }
      );
    }



    get_statistics() {
      // get the data
      this.httpdataservice.get_request(this.httpdataservice.GET_STATISTICS).subscribe(
        (res) => {
          var data = JSON.parse(JSON.stringify(res));
          this.dashCard1[7].text = data.XCASH_DPOPS_round_number;
          this.dashCard1[1].text = data.current_block_height;
          this.dashCard1[2].text = 50;
          this.dashCard1[4].text = this.functionsService.get_lg_numer_format(parseInt(data.total_votes) / this.httpdataservice.XCASH_WALLET_DECIMAL_PLACES_AMOUNT);
          this.dashCard1[6].text = parseInt(data.XCASH_DPOPS_circulating_percentage);
        },
        (error) =>  {
          Swal.fire("Error","An error has occured.<br/>Get statistics failed.","error");
        }
      );
    }



    get_delegates() {
      // get the data
      this.httpdataservice.get_request(this.httpdataservice.GET_DELEGATES).subscribe(
        (res) => {

          let data2 = JSON.parse(JSON.stringify(res));

          let count = 0;
          let delegate_total_vote_count = 0;
          let current_delegate_total_vote_count2 = 0;
          let xcash_wallet_decimal_places_amount = this.httpdataservice.XCASH_WALLET_DECIMAL_PLACES_AMOUNT;

          this.dashCard1[3].text = data2.length;

          for (count = 0 ; count < data2.length; count++)
          {
            current_delegate_total_vote_count2 = parseInt(data2[count].total_vote_count) / xcash_wallet_decimal_places_amount;
            delegate_total_vote_count += current_delegate_total_vote_count2;
          }

          this.dashCard1[8].text = this.functionsService.get_lg_numer_format(parseInt(data2[49].total_vote_count) / this.httpdataservice.XCASH_WALLET_DECIMAL_PLACES_AMOUNT );
          // only use 45 to calculate this since there are no votes for the 5 seed nodes
          var avg_vote_count = this.functionsService.get_lg_numer_format(delegate_total_vote_count/45);
          this.dashCard1[5].text = avg_vote_count;
        },
        (error) => {
          Swal.fire("Error","An error has occured.<br/>Get delegates failed.","error");
        }
      );
    }

}
