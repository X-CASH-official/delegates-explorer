import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ExampleDatabase, ExampleDataSource } from './helpers.data';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatTableModule } from '@angular/material';
import {RouterTestingModule} from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpdataService} from 'app/services/http-request.service';

import { round_statisticsComponent } from './round_statistics.component';

describe('round_statisticsComponent', () => {
  let component: round_statisticsComponent;
  let fixture: ComponentFixture<round_statisticsComponent>;

  let test_data: any[] = [
    { id: "1", next_block_verifiers: 'data' },
    { id: "2", next_block_verifiers: 'data' }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ round_statisticsComponent ],
      imports: [HttpClientTestingModule,RouterTestingModule,MatTableModule],
      providers: [ HttpdataService ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(round_statisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

 // check that all html components are created
 it('should create', () => expect(component).toBeTruthy());

 it('should create dash card one', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard1')).toBeTruthy());
 it('should set dash card ones title', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard1').dashData.title).toBe('BLOCK PRODUCER DELEGATE NAME'));
 it('should set dash card ones property to a string', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard1').dashData.text).toBe(''));

 it('should create dash card two', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard2')).toBeTruthy());
 it('should set dash card twos title', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard2').dashData.title).toBe('BLOCK PRODUCER BACKUP DELEGATE COUNT'));
 it('should set dash card twos property to a number', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard2').dashData.text).toBe(0));

 it('should create dash card three', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard3')).toBeTruthy());
 it('should set dash card threes title', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard3').dashData.title).toBe('BLOCK PRODUCER DELEGATE PUBLIC ADDRESS'));
 it('should set dash card threes property to a string', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard3').dashData.text).toBe(''));

 it('should create dash card four', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard4')).toBeTruthy());
 it('should set dash card fours title', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard4').dashData.title).toBe('BLOCK PRODUCER BACKUP DELEGATE NAME'));
 it('should set dash card fours property to a string', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard4').dashData.text).toBe(''));

 it('should create dash card five', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard5')).toBeTruthy());
 it('should set dash card fives title', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard5').dashData.title).toBe('VRF SECRET KEY'));
 it('should set dash card fives property to a string', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard5').dashData.text).toBe(''));

 it('should create dash card six', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard6')).toBeTruthy());
 it('should set dash card sixs title', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard6').dashData.title).toBe('VRF PUBLIC KEY'));
 it('should set dash card sixs property to a string', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard6').dashData.text).toBe(''));

 it('should create dash card seven', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard7')).toBeTruthy());
 it('should set dash card sevens title', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard7').dashData.title).toBe('VRF PROOF'));
 it('should set dash card sevens property to a string', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard7').dashData.text).toBe(''));

 it('should create dash card eight', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard8')).toBeTruthy());
 it('should set dash card eights title', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard8').dashData.title).toBe('VRF BETA STRING'));
 it('should set dash card eights property to a string', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard8').dashData.text).toBe(''));

 it('should create block_verifiers_vrf_secret_key table', () => expect(fixture.debugElement.nativeElement.querySelector('#block_verifiers_vrf_secret_key_table')).toBeTruthy());
 it('should create block_verifiers_vrf_public_key table', () => expect(fixture.debugElement.nativeElement.querySelector('#block_verifiers_vrf_public_key_table')).toBeTruthy());
 it('should create block_verifiers_random_data table', () => expect(fixture.debugElement.nativeElement.querySelector('#block_verifiers_random_data_table')).toBeTruthy());
 it('should create next_block_verifiers_public_key table', () => expect(fixture.debugElement.nativeElement.querySelector('#next_block_verifiers_public_key_table')).toBeTruthy());
 it('should create current_block_verifiers_data_signature table', () => expect(fixture.debugElement.nativeElement.querySelector('#current_block_verifiers_data_signature_table')).toBeTruthy());

 // test the code
 it('should update block_verifiers_vrf_secret_key table', () => {
   component.exampleDatabase1 = new ExampleDatabase();
   test_data.forEach((item) => component.exampleDatabase1.addUser(item.id,item.next_block_verifiers));
   component.dataSource1 = new ExampleDataSource(component.exampleDatabase1);

   fixture.detectChanges();
   expect(fixture.debugElement.nativeElement.querySelector('#id1').textContent).toContain(test_data[0].id);
   expect(fixture.debugElement.nativeElement.querySelector('#block_verifiers_vrf_secret_key1').textContent).toContain(test_data[0].next_block_verifiers);
   
   expect(fixture.debugElement.nativeElement.querySelector('#id2').textContent).toContain(test_data[1].id);
   expect(fixture.debugElement.nativeElement.querySelector('#block_verifiers_vrf_secret_key2').textContent).toContain(test_data[1].next_block_verifiers);
 });

 it('should update block_verifiers_vrf_public_key table', () => {
  component.exampleDatabase2 = new ExampleDatabase();
  test_data.forEach((item) => component.exampleDatabase2.addUser(item.id,item.next_block_verifiers));
  component.dataSource2 = new ExampleDataSource(component.exampleDatabase2);

  fixture.detectChanges();
  expect(fixture.debugElement.nativeElement.querySelector('#id1').textContent).toContain(test_data[0].id);
  expect(fixture.debugElement.nativeElement.querySelector('#block_verifiers_vrf_public_key1').textContent).toContain(test_data[0].next_block_verifiers);
  
  expect(fixture.debugElement.nativeElement.querySelector('#id2').textContent).toContain(test_data[1].id);
  expect(fixture.debugElement.nativeElement.querySelector('#block_verifiers_vrf_public_key2').textContent).toContain(test_data[1].next_block_verifiers);
});

it('should update block_verifiers_random_data table', () => {
  component.exampleDatabase3 = new ExampleDatabase();
  test_data.forEach((item) => component.exampleDatabase3.addUser(item.id,item.next_block_verifiers));
  component.dataSource3 = new ExampleDataSource(component.exampleDatabase3);

  fixture.detectChanges();
  expect(fixture.debugElement.nativeElement.querySelector('#id1').textContent).toContain(test_data[0].id);
  expect(fixture.debugElement.nativeElement.querySelector('#block_verifiers_random_data1').textContent).toContain(test_data[0].next_block_verifiers);
  
  expect(fixture.debugElement.nativeElement.querySelector('#id2').textContent).toContain(test_data[1].id);
  expect(fixture.debugElement.nativeElement.querySelector('#block_verifiers_random_data2').textContent).toContain(test_data[1].next_block_verifiers);
});

it('should update next_block_verifiers_public_key table', () => {
  component.exampleDatabase4 = new ExampleDatabase();
  test_data.forEach((item) => component.exampleDatabase4.addUser(item.id,item.next_block_verifiers));
  component.dataSource4 = new ExampleDataSource(component.exampleDatabase4);

  fixture.detectChanges();
  expect(fixture.debugElement.nativeElement.querySelector('#id1').textContent).toContain(test_data[0].id);
  expect(fixture.debugElement.nativeElement.querySelector('#next_block_verifiers_public_key1').textContent).toContain(test_data[0].next_block_verifiers);
  
  expect(fixture.debugElement.nativeElement.querySelector('#id2').textContent).toContain(test_data[1].id);
  expect(fixture.debugElement.nativeElement.querySelector('#next_block_verifiers_public_key2').textContent).toContain(test_data[1].next_block_verifiers);
});

it('should update current_block_verifiers_data_signature table', () => {
  component.exampleDatabase5 = new ExampleDatabase();
  test_data.forEach((item) => component.exampleDatabase5.addUser(item.id,item.next_block_verifiers));
  component.dataSource5 = new ExampleDataSource(component.exampleDatabase5);

  fixture.detectChanges();
  expect(fixture.debugElement.nativeElement.querySelector('#id1').textContent).toContain(test_data[0].id);
  expect(fixture.debugElement.nativeElement.querySelector('#current_block_verifiers_data_signature1').textContent).toContain(test_data[0].next_block_verifiers);
  
  expect(fixture.debugElement.nativeElement.querySelector('#id2').textContent).toContain(test_data[1].id);
  expect(fixture.debugElement.nativeElement.querySelector('#current_block_verifiers_data_signature2').textContent).toContain(test_data[1].next_block_verifiers);
});

});
