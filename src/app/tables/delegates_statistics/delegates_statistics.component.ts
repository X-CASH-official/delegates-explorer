import { Component, OnInit , ElementRef, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExampleDatabase, ExampleDataSource } from './helpers.data';
import {httpdataservice} from '../../services/http-request.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-fixed-table',
  templateUrl: './delegates_statistics.component.html',
  styleUrls: ['./delegates_statistics.component.scss']
})
export class delegates_statisticsComponent implements OnInit {
        public dashCard1 = [
        { colorDark: '#fa741c', colorLight: '#fb934e', width: 40, text: 0, settings: true, title: 'TOTAL VOTE COUNT', icon: 'cloud' },
        { colorDark: '#fa741c', colorLight: '#fb934e', width: 40, text: 0, settings: true, title: 'CURRENT DELEGATE RANK', icon: 'cloud' }
    ];
	public dashCard2 = [
        { colorDark: '#fa741c', colorLight: '#fb934e', width: 40, text: 0, settings: true, title: 'BLOCK VERIFIER TOTAL ROUNDS', icon: 'cloud' },
        { colorDark: '#fa741c', colorLight: '#fb934e', width: 40, text: 0, settings: true, title: 'BLOCK VERIFIER ONLINE PERCENTAGE', icon: 'cloud' }
    ];
	public dashCard3 = [
        { colorDark: '#fa741c', colorLight: '#fb934e', width: 40, text: 0, settings: true, title: 'BLOCK PRODUCER TOTAL ROUNDS', icon: 'cloud' },
        { colorDark: '#fa741c', colorLight: '#fb934e', width: 40, text: 0, settings: true, title: 'VRF NODE PUBLIC AND SECRET KEY TOTAL ROUNDS', icon: 'cloud' }
    ];
	public dashCard4 = [
        { colorDark: '#fa741c', colorLight: '#fb934e', width: 40, text: 0, settings: true, title: 'VRF NODE RANDOM DATA TOTAL ROUNDS', icon: 'cloud' },
        { colorDark: '#fa741c', colorLight: '#fb934e', width: 40, text: 0, settings: true, title: 'VRF NEXT MAIN NODES TOTAL ROUNDS', icon: 'cloud' }
    ];
        title:string = "Delegates Statistics";
        delegates_data:string = "";
	public displayedColumns = ['ID', 'Block_Height', 'Main_Nodes_Role'];
	public exampleDatabase = new ExampleDatabase();
	public dataSource: ExampleDataSource | null;
  	public showFilterTableCode;
  	constructor(private route: ActivatedRoute, private httpdataservice: httpdataservice) { } 

  	ngOnInit() {
        this.delegates_data = this.route.snapshot.queryParamMap.get("data");
        this.title = "Delegates Statistics For " + this.delegates_data;

        // get the data	 
	this.httpdataservice.get_request(this.httpdataservice.SERVER_HOSTNAME_AND_PORT_GET_DELEGATES_STATISTICS + "?parameter1=" + this.delegates_data).subscribe(
	(res) =>
	{
          this.exampleDatabase = new ExampleDatabase();
          var data = JSON.parse(JSON.stringify(res));
          var block_producer_block_heights = data.block_producer_block_heights.split("|");
          var vrf_node_public_and_secret_key_block_heights = data.VRF_node_public_and_secret_key_block_heights.split("|");
          var vrf_node_random_data_block_heights = data.VRF_node_random_data_total_rounds.split("|");
          var vrf_node_next_main_nodes_block_heights = data.VRF_node_next_main_nodes_block_heights.split("|");
	  var count = 0;
          var counter = 0;
          for (count = 0; count < block_producer_block_heights.length; count++, counter++)
	  {
	    this.exampleDatabase.addUser((counter + 1).toString(),block_producer_block_heights[count].toString(),"Block Producer");
	  }
          for (count = 0; count < vrf_node_public_and_secret_key_block_heights.length; count++, counter++)
	  {
	    this.exampleDatabase.addUser((counter + 1).toString(),vrf_node_public_and_secret_key_block_heights[count].toString(),"VRF Node Public and Secret Key");
	  }
          for (count = 0; count < vrf_node_random_data_block_heights.length; count++, counter++)
	  {
	    this.exampleDatabase.addUser((counter + 1).toString(),vrf_node_random_data_block_heights[count].toString(),"VRF Node Random Data");
	  }
          for (count = 0; count < vrf_node_next_main_nodes_block_heights.length; count++, counter++)
	  {
	    this.exampleDatabase.addUser((counter + 1).toString(),vrf_node_next_main_nodes_block_heights[count].toString(),"VRF Node Next Main Nodes");
	  }
	  this.dashCard1[0].text = data.total_vote_count;
	  this.dashCard1[1].text = data.current_delegate_rank;
	  this.dashCard2[0].text = data.block_verifier_total_rounds;
	  this.dashCard2[1].text = data.block_verifier_online_percentage;
	  this.dashCard3[0].text = data.block_producer_total_rounds;
	  this.dashCard3[1].text = data.VRF_node_public_and_secret_key_total_rounds;
	  this.dashCard4[0].text = data.VRF_node_random_data_total_rounds;
	  this.dashCard4[1].text = data.VRF_node_next_main_nodes_total_rounds;
  	  this.dataSource = new ExampleDataSource(this.exampleDatabase);
          },
          (error) => 
          {
            Swal.fire("Error","An error has occured","error");
          }
	);       
        }
}
