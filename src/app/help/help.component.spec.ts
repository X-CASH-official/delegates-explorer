import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import {HttpdataService} from 'app/services/http-request.service';

import { HelpComponent } from './help.component';

describe('HelpComponent', () => {
  let component: HelpComponent;
  let fixture: ComponentFixture<HelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpComponent ],
      imports: [HttpClientTestingModule],
      providers: [ HttpdataService ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // check that all html components are created
  it('should create', () => expect(component).toBeTruthy());

  it('should create dash card one', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard1')).toBeTruthy());
  it('should set dash card ones title', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard1').dashData.title).toBe('PROOF OF STAKE ROUND NUMBER'));
  it('should set dash card ones property to a number', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard1').dashData.text).toBe(0));

  it('should create dash card two', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard2')).toBeTruthy());
  it('should set dash card twos title', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard2').dashData.title).toBe('BLOCK HEIGHT'));
  it('should set dash card twos property to a number', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard2').dashData.text).toBe(0));

  it('should create dash card three', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard3')).toBeTruthy());
  it('should set dash card threes title', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard3').dashData.title).toBe('TOTAL VOTES'));
  it('should set dash card threes property to a number', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard3').dashData.text).toBe(0));

  it('should create dash card four', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard4')).toBeTruthy());
  it('should set dash card fours title', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard4').dashData.title).toBe('PROOF OF STAKE CIRCULATING PERCENTAGE'));
  it('should set dash card fours property to a number', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard4').dashData.text).toBe(0));

  it('should create profile card one', () => expect(fixture.debugElement.nativeElement.querySelector('#profilecard1')).toBeTruthy());
  it('should set profile card ones title', () => expect(fixture.debugElement.nativeElement.querySelector('#profilecard1').title).toBe('Voting Rules'));

  it('should create profile card two', () => expect(fixture.debugElement.nativeElement.querySelector('#profilecard2')).toBeTruthy());
  it('should set profile card twos title', () => expect(fixture.debugElement.nativeElement.querySelector('#profilecard2').title).toBe('How to vote in the CLI'));

  it('should create profile card three', () => expect(fixture.debugElement.nativeElement.querySelector('#profilecard3')).toBeTruthy());
  it('should set profile card threes title', () => expect(fixture.debugElement.nativeElement.querySelector('#profilecard3').title).toBe('How to register a delegate'));

  it('should create profile card four', () => expect(fixture.debugElement.nativeElement.querySelector('#profilecard4')).toBeTruthy());
  it('should set profile card fours title', () => expect(fixture.debugElement.nativeElement.querySelector('#profilecard4').title).toBe('How to update a delegates data'));

  it('should create profile card five', () => expect(fixture.debugElement.nativeElement.querySelector('#profilecard5')).toBeTruthy());
  it('should set profile card fives title', () => expect(fixture.debugElement.nativeElement.querySelector('#profilecard5').title).toBe('How to remove a delegate'));

  it('should create profile card six', () => expect(fixture.debugElement.nativeElement.querySelector('#profilecard6')).toBeTruthy());
  it('should set profile card sixs title', () => expect(fixture.debugElement.nativeElement.querySelector('#profilecard6').title).toBe('How to verify round statistics in the CLI'));

  // test the services
  it('Test GET /delegateswebsitegetstatistics',inject([HttpTestingController, HttpdataService],(httpMock: HttpTestingController, httpdataservice: HttpdataService) => {
    HttpdataService.get_request(HttpdataService.GET_STATISTICS).subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.Response:
           }
         });

         const mockReq = httpMock.match(httpdataservice.GET_STATISTICS);
         expect(mockReq.slice(-1)[0].cancelled).toBeFalsy();
         expect(mockReq.slice(-1)[0].request.method).toBe('GET');
         expect(mockReq.slice(-1)[0].request.responseType).toEqual('json');
         mockReq.slice(-1)[0].flush(1);
         httpMock.verify();
  }));

  // test the code
  it('should update dash card ones property', () => {
    fixture.debugElement.nativeElement.querySelector('#dashcard1').dashData.text = 0;
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('#dashcard1').dashData.text).toBe(0);
 });

 it('should update dash card twos property', () => {
   fixture.debugElement.nativeElement.querySelector('#dashcard2').dashData.text = 0;
   fixture.detectChanges();
   expect(fixture.debugElement.nativeElement.querySelector('#dashcard2').dashData.text).toBe(0);
 });

 it('should update dash card threes property', () => {
   fixture.debugElement.nativeElement.querySelector('#dashcard3').dashData.text = 0;
   fixture.detectChanges();
   expect(fixture.debugElement.nativeElement.querySelector('#dashcard3').dashData.text).toBe(0);
 });

 it('should update dash card fours property', () => {
   fixture.debugElement.nativeElement.querySelector('#dashcard4').dashData.text = 0;
   fixture.detectChanges();
   expect(fixture.debugElement.nativeElement.querySelector('#dashcard4').dashData.text).toBe(0);
});
});
