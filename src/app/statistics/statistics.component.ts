import { Component, OnInit } from '@angular/core';
import {httpdataservice} from '../services/http-request.service';
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
        public dashCard1 = [
        { colorDark: '#fa741c', colorLight: '#fb934e', width: 20, text_settings: 20, text: '', settings: false, title: 'MOST TOTAL ROUNDS', icon: 'cloud' },
        { colorDark: '#fa741c', colorLight: '#fb934e', width: 20, text: 0, settings: true, title: 'MOST TOTAL ROUNDS', icon: 'cloud' }
    ];

        public dashCard2 = [
        { colorDark: '#fa741c', colorLight: '#fb934e', width: 20, text_settings: 20, text: '', settings: false, title: 'MOST BLOCK PRODUCER TOTAL ROUNDS', icon: 'cloud' },
        { colorDark: '#fa741c', colorLight: '#fb934e', width: 20, text: 0, settings: true, title: 'MOST BLOCK PRODUCER TOTAL ROUNDS', icon: 'cloud' }
    ];

        public dashCard3 = [
        { colorDark: '#fa741c', colorLight: '#fb934e', width: 20, text_settings: 20, text: '', settings: false, title: 'MOST VRF PUBLIC AND SECRET KEY TOTAL ROUNDS', icon: 'cloud' },
        { colorDark: '#fa741c', colorLight: '#fb934e', width: 20, text: 0, settings: true, title: 'MOST VRF PUBLIC AND SECRET KEY TOTAL ROUNDS', icon: 'cloud' }
    ];

        public dashCard4 = [
        { colorDark: '#fa741c', colorLight: '#fb934e', width: 20, text_settings: 20, text: '', settings: false, title: 'MOST VRF RANDOM DATA TOTAL ROUNDS', icon: 'cloud' },
        { colorDark: '#fa741c', colorLight: '#fb934e', width: 20, text: 0, settings: true, title: 'MOST VRF RANDOM DATA TOTAL ROUNDS', icon: 'cloud' }
    ];

        public dashCard5 = [
        { colorDark: '#fa741c', colorLight: '#fb934e', width: 20, text_settings: 20, text: '', settings: false, title: 'MOST VRF NEXT MAIN NODES TOTAL ROUNDS', icon: 'cloud' },
        { colorDark: '#fa741c', colorLight: '#fb934e', width: 20, text: 0, settings: true, title: 'MOST VRF NEXT MAIN NODES TOTAL ROUNDS', icon: 'cloud' }
    ];

    constructor(private httpdataservice: httpdataservice) { }

    ngOnInit() {
          // get the data
	  this.httpdataservice.get_request(this.httpdataservice.SERVER_HOSTNAME_AND_PORT_GET_STATISTICS).subscribe(
	  (res) =>
	  {
            var data = JSON.parse(JSON.stringify(res));
            this.dashCard1[0].text = data.most_total_rounds_delegate_name;
            this.dashCard1[1].text = data.most_total_rounds;  
            this.dashCard2[0].text = data.most_block_producer_total_rounds_delegate_name;
            this.dashCard2[1].text = data.most_block_producer_total_rounds;    
            this.dashCard3[0].text = data.most_VRF_node_public_and_private_key_total_rounds_delegate_name;
            this.dashCard3[1].text = data.most_VRF_node_public_and_private_key_total_rounds; 
            this.dashCard4[0].text = data.most_VRF_node_random_data_total_rounds_delegate_name;
            this.dashCard4[1].text = data.most_VRF_node_random_data_total_rounds; 
            this.dashCard5[0].text = data.most_VRF_node_next_main_nodes_total_rounds_delegate_name;
            this.dashCard5[1].text = data.most_VRF_node_next_main_nodes_total_rounds;  
	  },
	  (error) => 
          {
	    Swal.fire("Error","An error has occured","error");
	  }
	  );
    }
}
