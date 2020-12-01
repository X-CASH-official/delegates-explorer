import { Component, OnInit, Input } from '@angular/core';
import { FunctionsService } from './../../services/functions.service';


@Component({
  selector: 'cdk-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent implements OnInit {

  @Input() title: string;
  @Input() settings: object;
  @Input() data_settings: object;
  @Input() text_settings: object;
  @Input() data: string;
  @Input() button_name: string;
  @Input() button_length: string;
  @Input() button_click: string;

  constructor(public functionsService: FunctionsService){ }

  width:number = 0;

  redirect(url:string){
    window.location.href = url;
  }
  ngOnInit() {

    this.width = window.innerWidth * 0.9;
  }
}
