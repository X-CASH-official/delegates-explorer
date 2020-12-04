import { Component, OnInit } from '@angular/core';
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

    constructor(private titleService:Title) {
        this.titleService.setTitle(" API - Delegates Explorer - X-CASH");
     }

    ngOnInit() {

      let data = API_DATA;

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
                          \xA0 \xA0 \xA0--url "`+ data[key].request_url  + `" \\
                          \xA0 \xA0 \xA0--header 'Accept: application/json' \\
                          \xA0 \xA0 \xA0--header 'Content-Type: application/json'`.trim();

        data[key].es8 = `let url = '"`+ data[key].request_url + `"';
let response = await fetch(url);

if (response.ok) {
\xA0 let data = await response.json();
} else {
\xA0 alert("HTTP-Error: " + response.status);
}`.trim();


        data[key].xhr = `var data = null;
                                var xhr = new XMLHttpRequest();
                                xhr.withCredentials = false;

                                xhr.addEventListener("readystatechange", function () {
                                \xA0  if (this.readyState === this.DONE) {
                                  \xA0 \xA0  console.log(this.responseText);
                                \xA0  }
                                });

                                xhr.open("GET", "`+ data[key].request_url + `");
                                xhr.setRequestHeader("Content-Type", "application/json");
                                xhr.setRequestHeader("Accept", "application/json");

                                xhr.send(data);`.trim();
      });

      this.apiData = data;

    }

}
