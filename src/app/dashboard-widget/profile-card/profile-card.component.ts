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
  html: 'Once the wallet is loaded, type the following command:<br><br>vote DELEGATES_PUBLIC_ADDRESS or DELEGATES_NAME',
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
else if (data === "delegateswebsitegetstatistics")
    {
Swal.fire({
  title: '<b>Statistics</b>',
  type: 'info',
  width: this.width,
  customClass: 'swal-height',
  html: 'Get statistics<br>Method: GET<br>URL: /delegateswebsitegetstatistics<br>Result:<br>most_total_rounds_delegate_name: The delegate that has the most total rounds<br>most_total_rounds: The most total rounds by a delegate<br><br>best_block_verifier_online_percentage_delegate_name: The delegate that has the best block verifier online percentage<br><br>best_block_verifier_online_percentage: The best block verifier online percentage by a delegate<br><br>most_block_producer_total_rounds_delegate_name: The delegate that has been the block producer the most<br><br>most_block_producer_total_rounds: The most block producer total rounds by a delegate<br><br>current_block_height: The current block height<br><br>XCASH_DPOPS_round_number: The current xcash proof of stake round number<br><br>total_votes: The total amount of votes<br><br>XCASH_DPOPS_circulating_percentage: The percentage of total votes compared to the circulating supply<br><br>{"most_total_rounds_delegate_name":"delegate_name_5","most_total_rounds":"5","best_block_verifier_online_percentage_delegate_name":"delegate_name_2","best_block_verifier_online_percentage":"100","most_block_producer_total_rounds_delegate_name":"delegate_name_4","most_block_producer_total_rounds":"2","current_block_height":"521855","XCASH_DPOPS_round_number":"5","total_votes":"380000000","XCASH_DPOPS_circulating_percentage":"0"}',
  showCloseButton: false,
  showCancelButton: false,
})
    }
else if (data === "getdelegates")
    {
Swal.fire({
  title: '<b>Get Delegates</b>',
  type: 'info',
  width: this.width,
  customClass: 'swal-height',
  html: 'Get a list of all delegates<br><br>Method: GET<br><br>URL: /getdelegates<br><br>Result:<br><br>total_vote_count: The total amount staked towards the delegate<br><br>delegate_name: The delegates name<br><br>pool_mode: True if this is a delegate that wants users to vote for them, false is this delegate does not want users to vote for them<br><br>fee_structure: The fee in a percent<br><br>block_verifier_score: How many invalid reserve proofs the delegate has found<br><br>online_status: The current online status of the delegate<br><br>block_verifier_total_rounds: The total rounds the delegate has been a block verifiers<br><br>block_verifier_online_percentage: The total amount of rounds they were a block verifier and online / the total amount of rounds they were a block verifier<br><br>[{"total_vote_count":"200000000","delegate_name":"delegate_name_5","pool_mode":"false","fee_structure":"0.100000","block_verifier_score":"0","online_status":"true","block_verifier_total_rounds":"5","block_verifier_online_percentage":"0"},{"total_vote_count":"100000000","delegate_name":"delegate_name_4","pool_mode":"false","fee_structure":"","block_verifier_score":"0","online_status":"true","block_verifier_total_rounds":"4","block_verifier_online_percentage":"25"},{"total_vote_count":"50000000","delegate_name":"delegate_name_3","pool_mode":"false","fee_structure":"","block_verifier_score":"0","online_status":"true","block_verifier_total_rounds":"3","block_verifier_online_percentage":"33"},{"total_vote_count":"20000000","delegate_name":"delegate_name_2","pool_mode":"false","fee_structure":"","block_verifier_score":"0","online_status":"true","block_verifier_total_rounds":"2","block_verifier_online_percentage":"100"},{"total_vote_count":"10000000","delegate_name":"delegate_name_1","pool_mode":"false","fee_structure":"","block_verifier_score":"0","online_status":"true","block_verifier_total_rounds":"1","block_verifier_online_percentage":"0"}]',
  showCloseButton: false,
  showCancelButton: false,
})
    }
else if (data === "getdelegatesstatistics")
    {
Swal.fire({
  title: '<b>Get Delegates Statistics</b>',
  type: 'info',
  width: this.width,
  customClass: 'swal-height',
  html: 'Get a delegates statistics<br>Method: GET<br>URL: /getdelegatesstatistics<br>Parameters:<br> parameter1: The delegates public address, or the delegates name<br>Result:<br>public_address: The public address of the delegate<br>total_vote_count: The total votes staked towards the delegate<br>total_vote_count_number: Same as the total_vote_count<br>IP_address: The delegates IP address, or a domain name<br>delegate_name: The delegates name<br>about: About (optional)<br>website: Website (optional)<br>team: Team (optional)<br>pool_mode: True if this is a delegate that wants users to vote for them, false is this delegate does not want users to vote for them<br>fee_structure: The fee in a percent<br>server_settings: Server settings (optional)<br>block_verifier_score: How many invalid reserve proofs the delegate has found<br>online_status: The current online status of the delegate<br>block_verifier_total_rounds: The total rounds the delegate has been a block verifiers<br>block_verifier_online_total_rounds: The total rounds the delegate has been online and a block verifier<br>block_verifier_online_percentage: The total amount of rounds they were a block verifier and online / the total amount of rounds they were a block verifier<br>block_producer_total_rounds: The total rounds the deelgate has been the block producer<br>block_producer_block_heights: The block heights that the delegate has found<br><br>{"public_address":"XCA1v18Qsf5PKLr8GFr14jHkjgf3mPm1MAVbswBs9QP7FwGTLCE4SwYi81BRp2vrcV12maMtCw9TE1NZRVyynQ3e2c3b7mxRw3","total_vote_count":"1000000","total_vote_count_number":"10.0","IP_address":"127.0.0.1","delegate_name":"delegatename1","about":"About","website":"Website","team":"Team","pool_mode":"false","fee_structure":"1","server_settings":"server_settings","block_verifier_score":"1","online_status":"true","block_verifier_total_rounds":"40","block_verifier_online_total_rounds":"38","block_verifier_online_percentage":"100","block_producer_total_rounds":"7","block_producer_block_heights":"2813049|10|15|240503|240507"}',
  showCloseButton: false,
  showCancelButton: false,
})
    }
else if (data === "getdelegatesinformation")
    {
Swal.fire({
  title: '<b>Get Delegates Information</b>',
  type: 'info',
  width: this.width,
  customClass: 'swal-height',
  html: 'Get a delegates information<br><br>Method: GET<br><br>URL: /getdelegatesinformation<br><br>Parameters:<br><br> parameter1: The delegates public address, or the delegates name<br><br>Result:<br><br>public_address: The public address of the delegateAbout (optional)<br>website: Website (optional)<br>team: Team (optional)<br>pool_mode: True if this is a delegate that wants users to vote for them, false is this delegate does not want users to vote for them<br>fee_structure: The fee in a percent<br>server_settings: Server settings (optional)<br><br>{"public_address":"XCA1pEWxj2q7gn7TJjae7JfsDhtnhydxsHhtADhDm4LbdE11rHVZqbX5MPGZ9tM7jQbDF4VKK89jSAqgL9Nxxjdh8RM5JEpZZP","total_vote_count":"10000000","delegate_name":"delegate_name_1","about":"","website":"","team":"","pool_mode":"false","fee_structure":"","server_settings":"","block_verifier_score":"0","online_status":"true","block_verifier_total_rounds":"1","block_verifier_online_total_rounds":"0","block_verifier_online_percentage":"0","block_producer_total_rounds":"0","block_producer_block_heights":"","current_delegate_rank":"5"}',
  showCloseButton: false,
  showCancelButton: false,
})
    }
else if (data === "getdelegatesvoterslist")
    {
Swal.fire({
  title: '<b>Get Delegates Voters List</b>',
  type: 'info',
  width: this.width,
  customClass: 'swal-height',
  html: 'Get a list of all delegates staking towards the shared delegate<br><br>Method: GET<br><br>URL: /getdelegatesvoterslist<br><br>Parameters:<br><br> parameter1: The public address of the shared delegate<br><br>Result:<br><br>public_address_created_reserve_proof: The public address of the delegate that is staking towards the shared delegate<br><br>public_address_voted_for: The public address of the shared delegate<br><br>total: The total amount of the reserve proof<br><br>reserve_proof: The reserve proof created by the delegate<br><br>[{"public_address_created_reserve_proof":"XCA1pEWxj2q7gn7TJjae7JfsDhtnhydxsHhtADhDm4LbdE11rHVZqbX5MPGZ9tM7jQbDF4VKK89jSAqgL9Nxxjdh8RM5JEpZZP","public_address_voted_for":"XCA1pEWxj2q7gn7TJjae7JfsDhtnhydxsHhtADhDm4LbdE11rHVZqbX5MPGZ9tM7jQbDF4VKK89jSAqgL9Nxxjdh8RM5JEpZZP","total":"120000000","reserve_proof":"ReserveProofV11BZ23sBt9sZJeGccf84mzyAmNCP3KzYbE1111112VKmH111118NDPqYHviiubTHpa5jPey2PF2RPr7p92nUY5PYcCqPwkM3Vezb1BvSAu2zX5kKMuJYo2q837KH4HAXkXbdgF6wa13pkkpuMxv74keNZLAeeM9wmSuJvSHmMvVjfo6u6iCWMDRESRouQ359NvpAZN71D9fSivgK7K7WkbNzftkUZ6V7Uza6K9eihTgu7hSB3AqaTm7cK9uTb5Fzg9LyJbC4phfGYM7bazM2UrVfitZtbEkKuhPxnzFzKkWtdYBB59zUo1uS4UUR8faS25sjfc2cPjZUfbEZsiJVo7EDNs3d1KdhTN5TdNxZK6MZgVB77jE9ed4jJUrNSrqfWg1BwigbN9smQicoi9yYwujuGaHEzEnLBwQeLFxJJQj31qRQb4ZijEBGrMxvcmybhPKiHA3LBARnBREJxkQ39dp2HRfEfR1G7z6RGhS9o1KQCF3MAwomCMCuj69SpeovPEYwQb5uVXti"},{"public_address_created_reserve_proof":"XCA1v18Qsf5PKLr8GFr14jHkjgf3mPm1MAVbswBs9QP7FwGTLCE4SwYi81BRp2vrcV12maMtCw9TE1NZRVyynQ3e2c3b7mxRw3","public_address_voted_for":"XCA1pEWxj2q7gn7TJjae7JfsDhtnhydxsHhtADhDm4LbdE11rHVZqbX5MPGZ9tM7jQbDF4VKK89jSAqgL9Nxxjdh8RM5JEpZZP","total":"200000000","reserve_proof":"ReserveProofV11BZ23sBt9sZJeGccf84mzyAmNCP3KzYbE1111112VKmH111118NDPqYHviiubTHpa5jPey2PF2RPr7p92nUY5PYcCqPwkM3Vezb1BvSAu2zX5kKMuJYo2q837KH4HAXkXbdgF6wa13pkkpuMxv74keNZLAeeM9wmSuJvSHmMvVjfo6u6iCWMDRESRouQ359NvpAZN71D9fSivgK7K7WkbNzftkUZ6V7Uza6K9eihTgu7hSB3AqaTm7cK9uTb5Fzg9LyJbC4phfGYM7bazM2UrVfitZtbEkKuhPxnzFzKkWtdYBB59zUo1uS4UUR8faS25sjfc2cPjZUfbEZsiJVo7EDNs3d1KdhTN5TdNxZK6MZgVB77jE9ed4jJUrNSrqfWg1BwigbN9smQicoi9yYwujuGaHEzEnLBwQeLFxJJQj31qRQb4ZijEBGrMxvcmybhPKiHA3LBARnBREJxkQ39dp2HRfEfR1G7z6RGhS9o1KQCF3MAwomCMCuj69SpeovPEYwQb5uVXti"}]',
  showCloseButton: false,
  showCancelButton: false,
})
    }
else if (data === "getroundstatistics")
    {
Swal.fire({
  title: '<b>Get Round Statistics</b>',
  type: 'info',
  width: this.width,
  customClass: 'swal-height',
  html: 'Get round statistics<br><br>Method: GET<br><br>URL: /getroundstatistics<br><br>Parameters:<br><br> parameter1: The block height<br><br>Result:<br><br>reserve_bytes: The complete block that contains all of the reserve bytes<br><br>{"reserve_bytes":"reserve_bytes"}',
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
