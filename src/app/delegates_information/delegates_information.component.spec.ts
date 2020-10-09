import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatTableModule } from '@angular/material';
import {RouterTestingModule} from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {httpdataservice} from 'app/services/http-request.service';

import { Delegates_informationComponent } from './delegates_information.component';

describe('Delegates_informationComponent', () => {
  let component: Delegates_informationComponent;
  let fixture: ComponentFixture<Delegates_informationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Delegates_informationComponent ],
      imports: [HttpClientTestingModule,RouterTestingModule,MatTableModule],
      providers: [ httpdataservice ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Delegates_informationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // check that all html components are created
  it('should create', () => expect(component).toBeTruthy());

  it('should create profile card one', () => expect(fixture.debugElement.nativeElement.querySelector('#profilecard1')).toBeTruthy());
  it('should set profile card ones title', () => expect(fixture.debugElement.nativeElement.querySelector('#profilecard1').title).toBe('About'));

  it('should create profile card two', () => expect(fixture.debugElement.nativeElement.querySelector('#profilecard2')).toBeTruthy());
  it('should set profile card twos title', () => expect(fixture.debugElement.nativeElement.querySelector('#profilecard2').title).toBe('Website'));

  it('should create profile card three', () => expect(fixture.debugElement.nativeElement.querySelector('#profilecard3')).toBeTruthy());
  it('should set profile card threes title', () => expect(fixture.debugElement.nativeElement.querySelector('#profilecard3').title).toBe('Team'));

  it('should create profile card four', () => expect(fixture.debugElement.nativeElement.querySelector('#profilecard4')).toBeTruthy());
  it('should set profile card fours title', () => expect(fixture.debugElement.nativeElement.querySelector('#profilecard4').title).toBe('Pool Mode'));

  it('should create profile card five', () => expect(fixture.debugElement.nativeElement.querySelector('#profilecard5')).toBeTruthy());
  it('should set profile card fives title', () => expect(fixture.debugElement.nativeElement.querySelector('#profilecard5').title).toBe('Fee Structure'));

  it('should create profile card six', () => expect(fixture.debugElement.nativeElement.querySelector('#profilecard6')).toBeTruthy());
  it('should set profile card sixs title', () => expect(fixture.debugElement.nativeElement.querySelector('#profilecard6').title).toBe('Server Settings'));

  it('should create profile card seven', () => expect(fixture.debugElement.nativeElement.querySelector('#profilecard7')).toBeTruthy());
  it('should set profile card sevens title', () => expect(fixture.debugElement.nativeElement.querySelector('#profilecard7').title).toBe('How to vote for this delegate'));
});
