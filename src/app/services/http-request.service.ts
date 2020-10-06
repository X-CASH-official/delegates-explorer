import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

@Injectable()
export class httpdataservice{
constructor(private httpClient: HttpClient) {}

SERVER_HOSTNAME_AND_PORT_GET_STATISTICS:string = "http://delegates.xcash.foundation/delegateswebsitegetstatistics";
SERVER_HOSTNAME_AND_PORT_GET_DELEGATES:string = "http://delegates.xcash.foundation/getdelegates";
SERVER_HOSTNAME_AND_PORT_GET_DELEGATES_STATISTICS:string = "http://delegates.xcash.foundation/getdelegatesstatistics";
SERVER_HOSTNAME_AND_PORT_GET_DELEGATES_INFORMATION:string = "http://delegates.xcash.foundation/getdelegatesinformation";
SERVER_HOSTNAME_AND_PORT_GET_DELEGATES_VOTERS_LIST:string = "http://delegates.xcash.foundation/getdelegatesvoterslist";
SERVER_HOSTNAME_AND_PORT_GET_ROUND_STATISTICS:string = "http://delegates.xcash.foundation/getroundstatistics";
SERVER_HOSTNAME_AND_PORT_GET_PUBLIC_ADDRESS_PAYMENT_INFORMATION:string = "http://delegates.xcash.foundation/getpublicaddresspaymentinformation";
XCASH_WALLET_DECIMAL_PLACES_AMOUNT:number = 1000000;

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
