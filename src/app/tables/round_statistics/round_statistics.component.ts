import { Component, OnInit , ElementRef, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExampleDatabase, ExampleDataSource } from './helpers.data';
import {HttpdataService} from '../../services/http-request.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-fixed-table',
  templateUrl: './round_statistics.component.html',
  styleUrls: ['./round_statistics.component.scss']
})


export class round_statisticsComponent implements OnInit {
	dashCard1 = [
      { colorDark: '#1189a5', colorLight: '#fa741c',  colorFont: '#ffffff', ogmeter: false, width_icon: 20, text_size: 26, text: '', suffix: '', title: 'PRODUCER DELEGATE', icon: 'verified_user' },
      { colorDark: '#1189a5', colorLight: '#fa741c',  colorFont: '#ffffff', ogmeter: true, width_icon: 20, text_size: 26, text: '', suffix: '', title: 'BACKUP DELEGATE COUNT', icon: 'av_timer' },
      { colorDark: '#1189a5', colorLight: '#fa741c',  colorFont: '#ffffff', ogmeter: false, width_icon: 20, text_size: 26, text: '', suffix: '', title: 'BACKUP DELEGATE', icon: 'admin_panel_settings' }
    ];
	dashCard2 = [
      { colorDark: '#1189a5', colorLight: '#fa741c',  colorFont: '#ffffff', ogmeter: false, width_icon: 0, text_size: 18, text: '', suffix: '', title: 'BLOCK PRODUCER DELEGATE PUBLIC ADDRESS', icon: 'cloud' }
    ];
  dashCard3 = [

    ];
  dashCard4 = [
      { colorDark: '#1189a5', colorLight: '#fa741c',  colorFont: '#ffffff', ogmeter: false, width_icon: 0, text_size: 18, text: '', suffix: '', title: 'VRF SECRET KEY', icon: 'cloud' }
    ];
  dashCard5 = [
      { colorDark: '#1189a5', colorLight: '#fa741c',  colorFont: '#ffffff', ogmeter: false, width_icon: 0, text_size: 18, text: '', suffix: '', title: 'VRF PUBLIC KEY', icon: 'cloud' }
    ];
  dashCard6 = [
      { colorDark: '#1189a5', colorLight: '#fa741c',  colorFont: '#ffffff', ogmeter: false, width_icon: 0, text_size: 18, text: '', suffix: '', title: 'VRF PROOF', icon: 'cloud' }
    ];
  dashCard7 = [
      { colorDark: '#1189a5', colorLight: '#fa741c',  colorFont: '#ffffff', ogmeter: false, width_icon: 0, text_size: 18, text: '', suffix: '', title: 'VRF BETA STRING', icon: 'cloud' }
    ];


	title:string = "Round Statistics";
  block_height:string = "";
  XCASH_WALLET_PREFIX = "584341";
  XCASH_PROOF_OF_STAKE_BLOCK_HEIGHT:number = 240501;
  BLOCK_VERIFIERS_AMOUNT:number = 50;
  BLOCKCHAIN_RESERVED_BYTES_START:string = "7c424c4f434b434841494e5f52455345525645445f42595445535f53544152547c";
  BLOCKCHAIN_DATA_SEGMENT_STRING:string = "7c424c4f434b434841494e5f444154415f5345474d454e545f535452494e477c";
  BLOCKCHAIN_RESERVED_BYTES_END:string = "7c424c4f434b434841494e5f52455345525645445f42595445535f454e447c";

  block_producer_delegates_name_data:string;
  block_producer_public_address_data:string;
  block_producer_node_backup_count_data:string;
  block_producer_backup_nodes_names_data:string;
  vrf_secret_key_round_part_4_data:string;
  vrf_public_key_round_part_4_data:string;
  vrf_alpha_string_round_part_4_data:string;
  vrf_proof_round_part_4_data:string;
  vrf_beta_string_round_part_4_data:string;


	public displayedColumns = ['ID', 'next_block_verifiers'];
	public exampleDatabase1;
  public exampleDatabase2;
  public exampleDatabase3;
  public exampleDatabase4;
  public exampleDatabase5;
	public dataSource1: ExampleDataSource | null;
	public dataSource2: ExampleDataSource | null;
	public dataSource3: ExampleDataSource | null;
	public dataSource4: ExampleDataSource | null;
	public dataSource5: ExampleDataSource | null;
	public showFilterTableCode;

  constructor(private route: ActivatedRoute, private HttpdataService: HttpdataService) { }

	ngOnInit() {
    this.block_height = this.route.snapshot.queryParamMap.get("data");
    this.title = this.block_height;

    // check if this is a proof of stake block
    if (parseInt(this.block_height) < this.XCASH_PROOF_OF_STAKE_BLOCK_HEIGHT)
    {
      Swal.fire("Error","An error has occured","error");
      return;
    }

	  // get the data
	  this.HttpdataService.get_request(this.HttpdataService.GET_ROUND_STATISTICS + "?parameter1=" + this.block_height).subscribe(
  	  (res) =>
  	  {
        this.exampleDatabase1 = new ExampleDatabase();
        this.exampleDatabase2 = new ExampleDatabase();
        this.exampleDatabase3 = new ExampleDatabase();
        this.exampleDatabase4 = new ExampleDatabase();
        this.exampleDatabase5 = new ExampleDatabase();
        var data = JSON.parse(JSON.stringify(res));
        this.BLOCK_VERIFIERS_AMOUNT = parseInt(data.block_verifiers_amount);

        // get the reserve bytes data
        var data2;
        var count = 0;
        var count2 = 0;
        var reserve_bytes = data.reserve_bytes.substr(data.reserve_bytes.indexOf(this.BLOCKCHAIN_RESERVED_BYTES_START)+66,(data.reserve_bytes.indexOf(this.BLOCKCHAIN_RESERVED_BYTES_END)) - (data.reserve_bytes.indexOf(this.BLOCKCHAIN_RESERVED_BYTES_START)+66));

        this.block_producer_delegates_name_data = this.text_to_string(reserve_bytes.substr(count,reserve_bytes.indexOf(this.BLOCKCHAIN_DATA_SEGMENT_STRING,count) - count));
        count = count + (this.block_producer_delegates_name_data.length * 2) + 64;

        this.block_producer_public_address_data = this.text_to_string(reserve_bytes.substr(count,reserve_bytes.indexOf(this.BLOCKCHAIN_DATA_SEGMENT_STRING,count) - count));
        count = count + (this.block_producer_public_address_data.length * 2) + 64;

        this.block_producer_node_backup_count_data = this.text_to_string(reserve_bytes.substr(count,reserve_bytes.indexOf(this.BLOCKCHAIN_DATA_SEGMENT_STRING,count) - count));
        count = count + (this.block_producer_node_backup_count_data.length * 2) + 64;

        this.block_producer_backup_nodes_names_data = this.text_to_string(reserve_bytes.substr(count,reserve_bytes.indexOf(this.BLOCKCHAIN_DATA_SEGMENT_STRING,count) - count));
        count = count + (this.block_producer_backup_nodes_names_data.length * 2) + 64;

        this.vrf_secret_key_round_part_4_data = reserve_bytes.substr(count,reserve_bytes.indexOf(this.BLOCKCHAIN_DATA_SEGMENT_STRING,count) - count);
        count = count + this.vrf_secret_key_round_part_4_data.length + 64;

        this.vrf_public_key_round_part_4_data = reserve_bytes.substr(count,reserve_bytes.indexOf(this.BLOCKCHAIN_DATA_SEGMENT_STRING,count) - count);
        count = count + this.vrf_public_key_round_part_4_data.length + 64;

        this.vrf_alpha_string_round_part_4_data = reserve_bytes.substr(count,reserve_bytes.indexOf(this.BLOCKCHAIN_DATA_SEGMENT_STRING,count) - count);
        count = count + this.vrf_alpha_string_round_part_4_data.length + 64;

        this.vrf_proof_round_part_4_data = reserve_bytes.substr(count,reserve_bytes.indexOf(this.BLOCKCHAIN_DATA_SEGMENT_STRING,count) - count);
        count = count + this.vrf_proof_round_part_4_data.length + 64;

        this.vrf_beta_string_round_part_4_data = reserve_bytes.substr(count,reserve_bytes.indexOf(this.BLOCKCHAIN_DATA_SEGMENT_STRING,count) - count);
        count = count + this.vrf_beta_string_round_part_4_data.length + 64;
        data2 = reserve_bytes.substr(count,reserve_bytes.indexOf(this.BLOCKCHAIN_DATA_SEGMENT_STRING,count) - count);

        count = count + data2.length + 64;
        data2 = reserve_bytes.substr(count,reserve_bytes.indexOf(this.BLOCKCHAIN_DATA_SEGMENT_STRING,count) - count);

        count = count + data2.length + 64;

        for (count2 = 0; count2 < this.BLOCK_VERIFIERS_AMOUNT; count2++) {
  	      data2 = reserve_bytes.substr(count,128);
          count = count + data2.length + 64;
          this.exampleDatabase1.addUser((count2 + 1).toString(),data2.toString());
  	    }

        for (count2 = 0; count2 < this.BLOCK_VERIFIERS_AMOUNT; count2++) {
  	      data2 = reserve_bytes.substr(count,64);
          count = count + data2.length + 64;
          this.exampleDatabase2.addUser((count2 + 1).toString(),data2.toString());
  	    }

        for (count2 = 0; count2 < this.BLOCK_VERIFIERS_AMOUNT; count2++) {
  	      data2 = reserve_bytes.substr(count,200);
          count = count2+1 != this.BLOCK_VERIFIERS_AMOUNT ? (count + data2.length + 64) : (count + data2.length + 86);
          this.exampleDatabase3.addUser((count2 + 1).toString(),data2.toString());
  	    }

        for (count2 = 0; count2 < this.BLOCK_VERIFIERS_AMOUNT; count2++) {
  	      data2 = this.text_to_string(reserve_bytes.substr(count,128));
          count = count + (data2.length * 2) + 86;
          this.exampleDatabase4.addUser((count2 + 1).toString(),data2.toString());
  	    }

        data2 = reserve_bytes.substr(count,reserve_bytes.indexOf(this.BLOCKCHAIN_DATA_SEGMENT_STRING,count) - count);
        count = count + data2.length + 64;

        for (count2 = 0; count2 < this.BLOCK_VERIFIERS_AMOUNT; count2++) {
          data2 = this.text_to_string(reserve_bytes.substr(count,576));
          count = count + (data2.length * 2) + 64;
          this.exampleDatabase5.addUser((count2 + 1).toString(),data2.toString());
        }

  	    this.dashCard1[0].text = this.block_producer_delegates_name_data;
  	    this.dashCard1[1].text = this.block_producer_node_backup_count_data;
        this.dashCard1[2].text = this.block_producer_backup_nodes_names_data.substr(0,this.block_producer_backup_nodes_names_data.indexOf(","));
  	    this.dashCard2[0].text = this.block_producer_public_address_data;
  	    //this.dashCard3[0].text = this.block_producer_backup_nodes_names_data.substr(0,this.block_producer_backup_nodes_names_data.indexOf(","));
  	    this.dashCard4[0].text = this.vrf_secret_key_round_part_4_data;
  	    this.dashCard5[0].text = this.vrf_public_key_round_part_4_data;
  	    this.dashCard6[0].text = this.vrf_proof_round_part_4_data;
  	    this.dashCard7[0].text = this.vrf_beta_string_round_part_4_data;

  	    this.dataSource1 = new ExampleDataSource(this.exampleDatabase1);
  	    this.dataSource2 = new ExampleDataSource(this.exampleDatabase2);
  	    this.dataSource3 = new ExampleDataSource(this.exampleDatabase3);
  	    this.dataSource4 = new ExampleDataSource(this.exampleDatabase4);
  	    this.dataSource5 = new ExampleDataSource(this.exampleDatabase5);
        },
        (error) =>
        {
          Swal.fire("Error","An error has occured.<br>Get round statistics failed.","error");
        }
	  );
	}

  text_to_string(text) {
    var string = "";
    var count = 0;
    for (count = 0; count < text.length; count += 2) {
      string += String.fromCharCode(parseInt(text.substr(count,2),16));
    }
    return string;
  }
}
