import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
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

});
