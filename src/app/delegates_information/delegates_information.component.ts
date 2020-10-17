import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {HttpdataService} from '../services/http-request.service';
import Swal from 'sweetalert2';


@Component({
    selector: 'app-delegates_information',
    templateUrl: './delegates_information.component.html',
    styleUrls: ['./delegates_information.component.scss']
})

export class Delegates_informationComponent implements OnInit {

    delegate_name:string = "Delegates Information";
    data;

    about:string;
    website:string;
    team:string;
    shared_delegate_status:string;
    delegate_fee:string;
    server_specs:string;
    public_address:string;

    constructor(private route: ActivatedRoute, private HttpdataService: HttpdataService) { }

    ngOnInit() {
      this.delegate_name = this.route.snapshot.queryParamMap.get("data");
      //this.delegate_name = this.delegate_name;

      this.HttpdataService.get_request(this.HttpdataService.GET_DELEGATES_INFORMATION + "?parameter1=" + this.delegate_name).subscribe(
      (res) => {
                var data = JSON.parse(JSON.stringify(res));

            // this.delegatestatistics = "website/auth/tables/delegates_statistics?data=" + this.public_address;
            // this.delegateprofileinformation = "website/auth/delegates_information?data=" + this.public_address;

                this.data = data;
                //this.title = data.delegate_name;
                this.about = data.about;
                this.website = data.website;
                this.team = data.team;
                this.shared_delegate_status = data.shared_delegate_status == 'true' ? 'Shared'  : 'Solo';
                this.delegate_fee = data.delegate_fee;
                this.server_specs = data.server_specs;
                this.public_address = data.public_address;
              },
              (error) =>
              {
                Swal.fire("Error","An error has occured","error");
              }
      );
    }

    copyVote(val: string){
     let selBox = document.createElement('textarea');
     selBox.style.position = 'fixed';
     selBox.style.left = '0';
     selBox.style.top = '0';
     selBox.style.opacity = '0';
     selBox.value = val;
     document.body.appendChild(selBox);
     selBox.focus();
     selBox.select();
     document.execCommand('copy');
     document.body.removeChild(selBox);
     Swal.fire("Success","The vote has been copied to the clipboard","success");
   }
}
