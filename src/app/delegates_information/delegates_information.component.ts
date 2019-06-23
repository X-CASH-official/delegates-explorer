import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {httpdataservice} from '../services/http-request.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-delegates_information',
    templateUrl: './delegates_information.component.html',
    styleUrls: ['./delegates_information.component.scss']
})

export class delegates_informationComponent implements OnInit {
    title:string = "Delegates Information";
    delegates_data:string = "";
    

    constructor(private route: ActivatedRoute, private httpdataservice: httpdataservice) { }

    ngOnInit() {
    this.delegates_data = this.route.snapshot.queryParamMap.get("data");
    this.title = "Delegates Information For " + this.delegates_data;
    }

}
