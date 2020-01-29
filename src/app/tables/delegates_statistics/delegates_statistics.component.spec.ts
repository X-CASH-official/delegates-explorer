import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ExampleDatabase, ExampleDataSource } from './helpers.data';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatTableModule } from '@angular/material';
import {RouterTestingModule} from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {httpdataservice} from 'app/services/http-request.service';

import { delegates_statisticsComponent } from './delegates_statistics.component';

describe('delegates_statisticsComponent', () => {
  let component: delegates_statisticsComponent;
  let fixture: ComponentFixture<delegates_statisticsComponent>;

  let test_data: any[] = [
    { id: "1", block_height: '100', status: "Block Producer" },
    { id: "2", block_height: '100', status: "Block Producer" }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ delegates_statisticsComponent ],
      imports: [HttpClientTestingModule,RouterTestingModule,MatTableModule],
      providers: [ httpdataservice ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(delegates_statisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // check that all html components are created
  it('should create', () => expect(component).toBeTruthy());

  it('should create dash card one', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard1')).toBeTruthy());
  it('should set dash card ones title', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard1').dashData.title).toBe('TOTAL VOTE COUNT'));
  it('should set dash card ones property to a number', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard1').dashData.text).toBe(0));

  it('should create dash card two', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard2')).toBeTruthy());
  it('should set dash card twos title', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard2').dashData.title).toBe('CURRENT DELEGATE RANK'));
  it('should set dash card twos property to a number', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard2').dashData.text).toBe(0));

  it('should create dash card three', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard3')).toBeTruthy());
  it('should set dash card threes title', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard3').dashData.title).toBe('BLOCK VERIFIER TOTAL ROUNDS'));
  it('should set dash card threes property to a number', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard3').dashData.text).toBe(0));

  it('should create dash card four', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard4')).toBeTruthy());
  it('should set dash card fours title', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard4').dashData.title).toBe('BLOCK PRODUCER TOTAL ROUNDS'));
  it('should set dash card fours property to a number', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard4').dashData.text).toBe(0));

  it('should create blocks_found table', () => expect(fixture.debugElement.nativeElement.querySelector('#blocks_found_table')).toBeTruthy());

  // test the code
  it('should update blocks_found table', () => {
    component.exampleDatabase = new ExampleDatabase();
    test_data.forEach((item) => component.exampleDatabase.addUser(item.id,item.block_height,item.status));
    component.dataSource = new ExampleDataSource(component.exampleDatabase);

    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('#id1').textContent).toContain(test_data[0].id);
    expect(fixture.debugElement.nativeElement.querySelector('#block_height1').textContent).toContain(test_data[0].block_height);
    
    expect(fixture.debugElement.nativeElement.querySelector('#id2').textContent).toContain(test_data[1].id);
    expect(fixture.debugElement.nativeElement.querySelector('#block_height2').textContent).toContain(test_data[1].block_height);
    });
});
