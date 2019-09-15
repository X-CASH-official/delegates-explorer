import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

@Injectable()
export class httpdataservice{
constructor(private httpClient: HttpClient) {}

SERVER_HOSTNAME_AND_PORT_GET_STATISTICS:string = "/delegateswebsitegetstatistics";
SERVER_HOSTNAME_AND_PORT_GET_DELEGATES:string = "/getdelegates";
SERVER_HOSTNAME_AND_PORT_GET_DELEGATES_STATISTICS:string = "/getdelegatesstatistics";
SERVER_HOSTNAME_AND_PORT_GET_DELEGATES_INFORMATION:string = "/getdelegatesinformation";
SERVER_HOSTNAME_AND_PORT_GET_DELEGATES_VOTERS_LIST:string = "/getdelegatesvoterslist";
SERVER_HOSTNAME_AND_PORT_GET_ROUND_STATISTICS:string = "/getroundstatistics";
SERVER_HOSTNAME_AND_PORT_GET_PUBLIC_ADDRESS_PAYMENT_INFORMATION:string = "/getpublicaddresspaymentinformation";

// Blockchain
XCASH_PROOF_OF_STAKE_BLOCK_HEIGHT:number = 240501 // The start block height for X-CASH proof of stake

// proof of stake
BLOCK_VERIFIERS_AMOUNT:number = 100 // The amount of block verifiers in a round

Timer:any;

get_request(url:string)
{
return this.httpClient.get(url);
}

post_request(url:string, data:string)
{
const headers = new HttpHeaders ({'Content-Type':'application/x-www-form-urlencoded'});
return this.httpClient.post(url,data, {headers: headers});
}

post_request_json(item: any[])
{
const headers = new HttpHeaders ({'Content-Type':'application/json'});
return this.httpClient.post('url',item, {headers: headers});
}

}
