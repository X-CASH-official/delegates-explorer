import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {httpdataservice} from 'app/services/http-request.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { APIComponent } from './API.component';

describe('APIComponent', () => {
  let component: APIComponent;
  let fixture: ComponentFixture<APIComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ APIComponent ],
      imports: [HttpClientTestingModule,RouterTestingModule],
      providers: [ httpdataservice ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(APIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
