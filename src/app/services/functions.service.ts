import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})

export class FunctionsService {
  constructor() { }

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

  get_lg_numer_format(value){
    var exp, suffixes = ['k', 'M', 'B', 't', 'q', 'Q'];
    if (Number.isNaN(value)) { return null; }
    if (value < 1000) { return value; }
    exp = Math.floor(Math.log(value) / Math.log(1000));
    return (value / Math.pow(1000, exp)).toFixed(1) + suffixes[exp - 1];
  }


  copyReserveProof(val: string){
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
   //Swal.fire(val,"The reserve proof has been copied to the clipboard");
   Swal.fire({
      width: 600,
      title: '<strong>The reserve proof has been copied to the clipboard</strong>',
      html: '<code>' + val + '</code>',
    })
  }

}
