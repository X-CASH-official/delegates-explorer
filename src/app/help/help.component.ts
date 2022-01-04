import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { environment } from './../../environments/environment';

@Component({
    selector: 'app-help',
    templateUrl: './help.component.html',
    styleUrls: ['./help.component.scss']
})

export class HelpComponent implements OnInit {
    delegatestatistics:string;
    delegateprofileinformation:string;
    public dashCard1 = [
        { colorDark: '#fa741c', colorLight: '#fb934e', width: 40, text: 0, settings: true, title: 'PROOF OF STAKE ROUND NUMBER', icon: 'autorenew' },
        { colorDark: '#fa741c', colorLight: '#fb934e', width: 40, text: 0, settings: true, title: 'BLOCK HEIGHT', icon: 'assignment' }
    ];

        public dashCard2 = [
        { colorDark: '#fa741c', colorLight: '#fb934e', width: 40, text: 0, settings: true, title: 'TOTAL VOTES', icon: 'done_all' },
        { colorDark: '#fa741c', colorLight: '#fb934e', width: 40, text: 0, settings: true, title: 'PROOF OF STAKE CIRCULATING PERCENTAGE', icon: 'pie_chart' }
    ];

    constructor(private titleService:Title) {
        this.titleService.setTitle(" Help - " + environment.shortTitle + " - X-CASH");
     }

    ngOnInit() {  }

}
