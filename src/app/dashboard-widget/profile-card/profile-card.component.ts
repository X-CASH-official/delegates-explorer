import { Component, OnInit, Input } from '@angular/core';
import Swal from 'sweetalert2';

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

  width:number = 0;

  constructor() { }

  copyMessage(val: string, text:string){
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
    Swal.fire("Success",text,"success");
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
  redirect(url:string){
  window.location.href = url;
  }
  ngOnInit() {
    this.width = window.innerWidth * 0.9;
  }
}
