import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import {HttpdataService} from 'app/services/http-request.service';
import { statisticsComponent } from './statistics.component';


describe('statisticsComponent', () => {
  let component: statisticsComponent;
  let fixture: ComponentFixture<statisticsComponent>;
  let service: HttpdataService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ statisticsComponent ],
      imports: [HttpClientTestingModule],
      providers: [ HttpdataService ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
    service = TestBed.get(HttpdataService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(statisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // check that all html components are created
  it('should create', () => expect(component).toBeTruthy());

  it('should create dash card one', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard1')).toBeTruthy());
  it('should set dash card ones title', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard1').dashData.title).toBe('MOST TOTAL ROUNDS'));
  it('should set dash card ones property to a string', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard1').dashData.text).toBe(''));

  it('should create dash card two', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard2')).toBeTruthy());
  it('should set dash card twos title', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard2').dashData.title).toBe('MOST TOTAL ROUNDS'));
  it('should set dash card twos property to a number', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard2').dashData.text).toBe(0));

  it('should create dash card three', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard3')).toBeTruthy());
  it('should set dash card threes title', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard3').dashData.title).toBe('MOST BLOCK PRODUCER TOTAL ROUNDS'));
  it('should set dash card threes property to a string', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard3').dashData.text).toBe(''));

  it('should create dash card four', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard4')).toBeTruthy());
  it('should set dash card fours title', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard4').dashData.title).toBe('MOST BLOCK PRODUCER TOTAL ROUNDS'));
  it('should set dash card fours property to a number', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard4').dashData.text).toBe(0));

  // test the code
  it('should update dash card ones property', () => {
     fixture.debugElement.nativeElement.querySelector('#dashcard1').dashData.text = "data";
     fixture.detectChanges();
     expect(fixture.debugElement.nativeElement.querySelector('#dashcard1').dashData.text).toBe('data');
  });

  it('should update dash card twos property', () => {
    fixture.debugElement.nativeElement.querySelector('#dashcard2').dashData.text = 0;
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('#dashcard2').dashData.text).toBe(0);
  });

  it('should update dash card threes property', () => {
    fixture.debugElement.nativeElement.querySelector('#dashcard3').dashData.text = "data";
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('#dashcard3').dashData.text).toBe('data');
  });

  it('should update dash card fours property', () => {
    fixture.debugElement.nativeElement.querySelector('#dashcard4').dashData.text = 0;
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('#dashcard4').dashData.text).toBe(0);
 });

});
