import { Component, OnInit , ElementRef, ViewChild} from '@angular/core';
import { ExampleDatabase, ExampleDataSource } from './helpers.data';
import {httpdataservice} from '../../services/http-request.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-fixed-table',
  templateUrl: './delegates.component.html',
  styleUrls: ['./delegates.component.scss']
})
export class delegatesComponent implements OnInit {
	public dashCard = [
        { colorDark: '#fa741c', colorLight: '#fb934e', width: 40, text: 0, settings: true, title: 'TOTAL BLOCK VERIFIERS', icon: 'cloud' },
        { colorDark: '#fa741c', colorLight: '#fb934e', width: 40, text_settings: 20, text: '', settings: false, title: 'NEXT RECALCULATING OF VOTES', icon: 'assignments' }
    ];
	public displayedColumns = ['ID', 'Delegate_Name', 'Online_Status', 'Pool_Mode', 'Fee_Structure', 'Block_Verifier_Total_Rounds', 'Block_Verifier_Online_Percentage', 'Total_Vote_Count', 'Block_Verifier_Score'];
	public exampleDatabase = new ExampleDatabase();
	public dataSource: ExampleDataSource | null;
  	public showFilterTableCode;
  	constructor(private httpdataservice: httpdataservice) { }

  	ngOnInit() {
        this.dashCard[0].text = 50;  

        setInterval(() => {
        var current_date_and_time = new Date();
        var minutes:any = (60 - current_date_and_time.getMinutes() - 1) % 5;
        var seconds:any = 60 - current_date_and_time.getSeconds() - 1;
        if (minutes < 10)
        {
          minutes = "0" + minutes.toString();
        }  
        if (seconds < 10)
        {
          seconds = "0" + seconds;
        }  
        this.dashCard[1].text = minutes + ":" + seconds;
        }, 1000); 

        this.get_delegates();  
      }

        get_delegates()
        {
          // get the data
	  this.httpdataservice.get_request(this.httpdataservice.SERVER_HOSTNAME_AND_PORT_GET_DELEGATES).subscribe(
	  (res) =>
	  {
            this.exampleDatabase = new ExampleDatabase();
            var data = JSON.parse(JSON.stringify(res));
	    var count = 0;
            var delegate_total_vote_count;
	    for (count = 0; count < data.length; count++)
	    {
              delegate_total_vote_count = parseInt(data[count].total_vote_count) / this.httpdataservice.XCASH_WALLET_DECIMAL_PLACES_AMOUNT;
	      this.exampleDatabase.addUser((count + 1).toString(),data[count].delegate_name.toString(),data[count].online_status.toString(),data[count].shared_delegates_status.toString(),data[count].delegate_fee.toString(),data[count].block_verifier_total_rounds.toString(),data[count].block_verifier_online_percentage.toString(),delegate_total_vote_count.toString(),data[count].block_verifier_score.toString());
	    }
  	    this.dataSource = new ExampleDataSource(this.exampleDatabase);
	  },
	  (error) => 
          {
	    Swal.fire("Error","An error has occured","error");
	  }
	  );
        }
}
