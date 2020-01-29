import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {httpdataservice} from 'app/services/http-request.service';
import { statisticsComponent } from './statistics.component';


describe('statisticsComponent', () => {
  let component: statisticsComponent;
  let fixture: ComponentFixture<statisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ statisticsComponent ],
      imports: [HttpClientTestingModule],
      providers: [ httpdataservice ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(statisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
