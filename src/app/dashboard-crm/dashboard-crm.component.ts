import { Component, OnInit } from '@angular/core';
import {httpdataservice} from '../services/http-request.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-dashboard-crm',
    templateUrl: './dashboard-crm.component.html',
    styleUrls: ['./dashboard-crm.component.scss']
})

export class DashboardCrmComponent implements OnInit {
    delegatestatistics:string;
    delegateprofileinformation:string;
    public dashCard1 = [
        { colorDark: '#fa741c', colorLight: '#fb934e', width: 40, text: 0, settings: true, title: 'PROOF OF STAKE ROUND NUMBER', icon: 'cloud' },
        { colorDark: '#fa741c', colorLight: '#fb934e', width: 40, text: 0, settings: true, title: 'BLOCK HEIGHT', icon: 'cloud' }
    ];

        public dashCard2 = [
        { colorDark: '#fa741c', colorLight: '#fb934e', width: 40, text: 0, settings: true, title: 'TOTAL VOTES', icon: 'cloud' },
        { colorDark: '#fa741c', colorLight: '#fb934e', width: 40, text: 0, settings: true, title: 'PROOF OF STAKE CIRCULATING PERCENTAGE', icon: 'cloud' }
    ];

    constructor(private httpdataservice: httpdataservice) { }

    ngOnInit() {
          // get the data
	  this.httpdataservice.get_request(this.httpdataservice.SERVER_HOSTNAME_AND_PORT_GET_STATISTICS).subscribe(
	  (res) =>
	  {
            var data = JSON.parse(JSON.stringify(res));
            this.dashCard1[0].text = data.xcash_proof_of_stake_round_number;
            this.dashCard1[1].text = data.current_block_height;  
            this.dashCard2[0].text = data.total_votes;
            this.dashCard2[1].text = data.xcash_proof_of_stake_circulating_percentage;  
	  },
	  (error) => 
          {
	    Swal.fire("Error","An error has occured","error");
	  }
	  );
    }

}
