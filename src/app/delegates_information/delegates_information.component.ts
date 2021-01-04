import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {HttpdataService} from '../services/http-request.service';
import Swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';
import { FunctionsService } from '../services/functions.service';

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

    constructor(private route: ActivatedRoute, private httpdataservice: HttpdataService, private titleService:Title, public functionsService: FunctionsService) {
        this.delegate_name = this.route.snapshot.queryParamMap.get("data");
        this.titleService.setTitle( this.delegate_name +  "Delegate Information - Delegates Explorer - X-CASH" );
     }


    ngOnInit() {



      this.httpdataservice.get_request(this.httpdataservice.GET_DELEGATES_INFORMATION + "?parameter1=" + this.delegate_name).subscribe(
        (res) => {
              var data = JSON.parse(JSON.stringify(res));

              this.data = data;
              this.about = data.about;
              this.website = data.website;
              this.team = data.team;
              this.shared_delegate_status = data.shared_delegate_status == 'solo' ? 'Solo' : data.shared_delegate_status == 'shared' ? 'Shared' : 'Group';
              this.delegate_fee = data.delegate_fee;
              this.server_specs = data.server_specs;
              this.public_address = data.public_address;
            },
            (error) =>    {
              Swal.fire("Error","An error has occured.<br/>Get delegates information failed.","error");
            }
        );
    }
}
