import { async, TestBed, inject} from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { HttpdataService } from 'app/services/http-request.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';


describe('HttpdataService', () => {
  let service: HttpdataService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ HttpdataService ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    service = TestBed.get(HttpdataService);
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Test GET request',inject([HttpTestingController, HttpdataService],(httpMock: HttpTestingController, HttpdataService: HttpdataService) => {
   HttpdataService.get_request(HttpdataService.GET_STATISTICS).subscribe((event: HttpEvent<any>) => {
     switch (event.type) {
       case HttpEventType.Response:
          }
        });

        const mockReq = httpMock.match(HttpdataService.GET_STATISTICS);
         expect(mockReq.slice(-1)[0].cancelled).toBeFalsy();
         expect(mockReq.slice(-1)[0].request.method).toBe('GET');
         expect(mockReq.slice(-1)[0].request.responseType).toEqual('json');
         mockReq.slice(-1)[0].flush(1);

        httpMock.verify();
  }));

  it('Test POST request',inject([HttpTestingController, HttpdataService],(httpMock: HttpTestingController, HttpdataService: HttpdataService) => {
   HttpdataService.post_request(HttpdataService.GET_STATISTICS,"DATA").subscribe((event: HttpEvent<any>) => {
     switch (event.type) {
       case HttpEventType.Response:
          }
        });

        const mockReq = httpMock.match(HttpdataService.GET_STATISTICS);
         expect(mockReq.slice(-1)[0].cancelled).toBeFalsy();
         expect(mockReq.slice(-1)[0].request.method).toBe('POST');
         expect(mockReq.slice(-1)[0].request.responseType).toEqual('json');
         mockReq.slice(-1)[0].flush(1);

        httpMock.verify();
  }));

});
