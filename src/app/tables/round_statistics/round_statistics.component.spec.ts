import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatTableModule } from '@angular/material';
import {RouterTestingModule} from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {httpdataservice} from 'app/services/http-request.service';

import { round_statisticsComponent } from './round_statistics.component';

describe('round_statisticsComponent', () => {
  let component: round_statisticsComponent;
  let fixture: ComponentFixture<round_statisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ round_statisticsComponent ],
      imports: [HttpClientTestingModule,RouterTestingModule,MatTableModule],
      providers: [ httpdataservice ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(round_statisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
