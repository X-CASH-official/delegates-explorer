import { Component, OnInit, Input } from '@angular/core';
import {httpdataservice} from '../../services/http-request.service';
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

    about:string;
    website:string;
    team:string;
    pool_mode:string;
    fee_structure:string;
    server_settings:string;
    public_address:string;

    width:number = 0;

    public bio =true;
    public skill;
    public proj;
    constructor(private httpdataservice: httpdataservice) { }

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

  redirect(url:string)
  {
    window.location.href = url;
  }

  voting_data(data:string)
  {
    if (data === "voting_rules")
    {
Swal.fire({
  title: '<b>Voting Rules</b>',
  type: 'info',
  width: this.width,
  customClass: 'swal-height',
  html: '<b>One vote per wallet</b> - Only one reserve proof will be valid per wallet address. This means you can only vote for one delegate per wallet address.<br><br><b>Changing your vote</b> - You can change your vote by voting for a new delegate, and the old vote will automatically be replaced with the new vote.',
  showCloseButton: false,
  showCancelButton: false,
})
    }
else if (data === "vote_cli")
    {
Swal.fire({
  title: '<b>Vote CLI</b>',
  type: 'info',
  width: this.width,
  customClass: 'swal-height',
  html: 'Once the wallet is loaded, type the following command:<br><br>vote DELEGATES_PUBLIC_ADDRESS',
  showCloseButton: false,
  showCancelButton: false,
})
    }
else if (data === "delegate_register")
    {
Swal.fire({
  title: '<b>Delegate Register</b>',
  type: 'info',
  width: this.width,
  customClass: 'swal-height',
  html: 'Once the wallet is loaded, type the following command:<br><br>delegate_register DELEGATE_NAME DELEGATE_IP_ADDRESS',
  showCloseButton: false,
  showCancelButton: false,
})
    }
else if (data === "delegate_update")
    {
Swal.fire({
  title: '<b>Delegate Update</b>',
  type: 'info',
  width: this.width,
  customClass: 'swal-height',
  html: 'Once the wallet is loaded, type the following command:<br><br>delegate_update ITEM (about, website, team, pool_mode, fee_structure and server_settings)',
  showCloseButton: false,
  showCancelButton: false,
})
    }
else if (data === "delegate_remove")
    {
Swal.fire({
  title: '<b>Delegate Remove</b>',
  type: 'info',
  width: this.width,
  customClass: 'swal-height',
  html: 'Once the wallet is loaded, type the following command:<br><br>delegate_remove',
  showCloseButton: false,
  showCancelButton: false,
})
    }
else if (data === "verify_round_statistics")
    {
Swal.fire({
  title: '<b>Verify Round Statistics</b>',
  type: 'info',
  width: this.width,
  customClass: 'swal-height',
  html: 'Once the wallet is loaded, type the following command:<br><br>verify_round_statistics BLOCK_HEIGHT_OR_BLOCK_HASH',
  showCloseButton: false,
  showCancelButton: false,
})
}



else if (data === "about" || data === "website" || data === "team" || data === "pool_mode" || data === "fee_structure" || data === "server_settings" || data === "public_address")
{
// get the data	 
this.httpdataservice.get_request(this.httpdataservice.SERVER_HOSTNAME_AND_PORT_GET_DELEGATES_INFORMATION + "?parameter1=" + this.data).subscribe(
(res) =>
{
var data2 = JSON.parse(JSON.stringify(res));
if (data === "about")
{
Swal.fire({
title: '<b>About</b>',
type: 'info',
width: this.width,
customClass: 'swal-height',
html: data2.about,
showCloseButton: false,
showCancelButton: false,
})
}
else if (data === "website")
{
Swal.fire({
  title: '<b>Website</b>',
  type: 'info',
  width: this.width,
  customClass: 'swal-height',
  html: data2.website,
  showCloseButton: false,
  showCancelButton: false,
})
}
else if (data === "team")
{
Swal.fire({
  title: '<b>Team</b>',
  type: 'info',
  width: this.width,
  customClass: 'swal-height',
  html: data2.team,
  showCloseButton: false,
  showCancelButton: false,
})
}
else if (data === "pool_mode")
{
Swal.fire({
  title: '<b>Pool Mode</b>',
  type: 'info',
  width: this.width,
  customClass: 'swal-height',
  html: data2.pool_mode,
  showCloseButton: false,
  showCancelButton: false,
})
}
else if (data === "fee_structure")
{
Swal.fire({
  title: '<b>Fee Structure</b>',
  type: 'info',
  width: this.width,
  customClass: 'swal-height',
  html: data2.fee_structure,
  showCloseButton: false,
  showCancelButton: false,
})
}
else if (data === "server_settings")
{
Swal.fire({
  title: '<b>Server Settings</b>',
  type: 'info',
  width: this.width,
  customClass: 'swal-height',
  html: data2.server_settings,
  showCloseButton: false,
  showCancelButton: false,
})
}
else if (data === "public_address")
{
Swal.fire({
  title: '<b>How to vote for this delegate</b>',
  type: 'info',
  width: this.width,
  customClass: 'swal-height',
  html: 'Once the wallet is loaded, type the following command:<br><br>vote ' + data2.public_address,
  showCloseButton: false,
  showCancelButton: true,
  cancelButtonText: "Copy",
  onClose: () => { this.copyMessage("vote " + data2.public_address,"The vote command for this particular delegate has been copied to the clipboard"); },
})
}
          
          },
          (error) => 
          {
            Swal.fire("Error","An error has occured","error");
          }
	); 
    }
  }

    ngOnInit() {
     this.width = window.innerWidth * 0.9;
    }

}
