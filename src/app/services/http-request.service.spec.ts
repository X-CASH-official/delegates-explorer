import { async, ComponentFixture, TestBed, inject} from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import {httpdataservice} from 'app/services/http-request.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';


describe('httpdataservice', () => {
  let service: httpdataservice;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ httpdataservice ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    service = TestBed.get(httpdataservice);
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Test GET request',inject([HttpTestingController, httpdataservice],(httpMock: HttpTestingController, httpdataservice: httpdataservice) => {
   httpdataservice.get_request(httpdataservice.SERVER_HOSTNAME_AND_PORT_GET_STATISTICS).subscribe((event: HttpEvent<any>) => {
     switch (event.type) {
       case HttpEventType.Response:
          }
        });

        const mockReq = httpMock.expectOne(httpdataservice.SERVER_HOSTNAME_AND_PORT_GET_STATISTICS);

        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.method).toBe('GET');
        expect(mockReq.request.responseType).toEqual('json');

        httpMock.verify();
      }));

  it('Test POST request',inject([HttpTestingController, httpdataservice],(httpMock: HttpTestingController, httpdataservice: httpdataservice) => {
   httpdataservice.post_request(httpdataservice.SERVER_HOSTNAME_AND_PORT_GET_STATISTICS,"DATA").subscribe((event: HttpEvent<any>) => {
     switch (event.type) {
       case HttpEventType.Response:
          }
        });

        const mockReq = httpMock.expectOne(httpdataservice.SERVER_HOSTNAME_AND_PORT_GET_STATISTICS);

        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.method).toBe('POST');
        expect(mockReq.request.responseType).toEqual('json');

        httpMock.verify();
      }));

});
