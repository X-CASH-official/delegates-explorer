import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {HttpdataService} from '../services/http-request.service';
import Swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';

import { environment } from './../../environments/environment';

import { API_DATA } from './API.data';

@Component({
    selector: 'app-API',
    templateUrl: './API.component.html',
    styleUrls: ['./API.component.scss']
})

export class APIComponent implements OnInit {
    delegates_data:string = "";
    apiData:any;

    constructor(private HttpdataService: HttpdataService, private titleService:Title) {
        this.titleService.setTitle(" API - Delegates Explorer - X-CASH");
     }

    ngOnInit() {

      let data = API_DATA;
      console.log(environment.baseURL);

      Object.keys(data).forEach(function(key) {

        var request_url = environment.baseURL + data[key].url;

        if (data[key].hasOwnProperty('parameters') ) {
          request_url = request_url + '?';

          Object.keys(data[key]['parameters']).forEach(function(key2) {
            var parameters_keys = data[key]['parameters'][key2].name + '=<VALUE>';
            if (parseInt(key2) > 0) { request_url = request_url + '&'; }
            request_url = request_url.concat(parameters_keys);
          });
        }

        data[key].request_url = request_url + '';

        data[key].curl = `curl --request GET \\
                          --url "`+ data[key].request_url  + `" \\
                          --header 'Accept: application/json' \\
                          --header 'Content-Type: application/json'`.trim();

        data[key].javascript = `var data = null;
                                var xhr = new XMLHttpRequest();
                                xhr.withCredentials = false;

                                xhr.addEventListener("readystatechange", function () {
                                  if (this.readyState === this.DONE) {
                                    console.log(this.responseText);
                                  }
                                });

                                xhr.open("GET", "`+ data[key].request_url + `");
                                xhr.setRequestHeader("Content-Type", "application/json");
                                xhr.setRequestHeader("Accept", "application/json");

                                xhr.send(data);`.trim();
      });

      this.apiData = data;

    }

}
