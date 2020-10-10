import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {HttpdataService} from '../services/http-request.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-API',
    templateUrl: './API.component.html',
    styleUrls: ['./API.component.scss']
})

export class APIComponent implements OnInit {
    title:string = "Delegates Information";
    delegates_data:string = "";
    

    constructor(private route: ActivatedRoute, private HttpdataService: HttpdataService) { }

    ngOnInit() {
    }

}
