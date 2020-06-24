import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { ExampleDatabase, ExampleDataSource } from './helpers.data';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatTableModule } from '@angular/material';
import {RouterTestingModule} from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import {httpdataservice} from 'app/services/http-request.service';

import { delegatesComponent } from './delegates.component';

describe('delegatesComponent', () => {
  let component: delegatesComponent;
  let fixture: ComponentFixture<delegatesComponent>;

  let test_data: any[] = [
    { id: "1", delegate_name: 'delegate_name_1', online_status: 'online', shared_delegates_status: 'false', delegate_fee: '1', block_verifier_total_rounds: '0', block_verifier_online_percentage: '100', total_vote_count: '0', block_verifier_score: '0' },
    { id: "2", delegate_name: 'delegate_name_2', online_status: 'online', shared_delegates_status: 'false', delegate_fee: '1', block_verifier_total_rounds: '0', block_verifier_online_percentage: '100', total_vote_count: '0', block_verifier_score: '0' }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ delegatesComponent ],
      imports: [HttpClientTestingModule,RouterTestingModule,MatTableModule],
      providers: [ httpdataservice ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(delegatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // check that all html components are created
  it('should create', () => expect(component).toBeTruthy());

  it('should create dash card one', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard1')).toBeTruthy());
  it('should set dash card ones title', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard1').dashData.title).toBe('TOTAL BLOCK VERIFIERS'));
  it('should set dash card ones property to a number', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard1').dashData.text).toBe(100));

  it('should create dash card two', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard2')).toBeTruthy());
  it('should set dash card twos title', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard2').dashData.title).toBe('NEXT RECALCULATING OF VOTES'));
  it('should set dash card twos property to a string', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard2').dashData.text).toBe(''));

  it('should create delegates table', () => expect(fixture.debugElement.nativeElement.querySelector('#delegates_table')).toBeTruthy());

  // test the code
  it('should update delegates table', () => {
    component.exampleDatabase = new ExampleDatabase();
    test_data.forEach((item) => component.exampleDatabase.addUser(item.id,item.delegate_name,item.online_status,item.shared_delegates_status,item.delegate_fee,item.block_verifier_total_rounds,item.block_verifier_online_percentage,item.total_vote_count,item.block_verifier_score));
    component.dataSource = new ExampleDataSource(component.exampleDatabase);

    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('#id1').textContent).toContain(test_data[0].id);
    expect(fixture.debugElement.nativeElement.querySelector('#delegatename1').textContent).toContain(test_data[0].delegate_name);
    expect(fixture.debugElement.nativeElement.querySelector('#online_status1').textContent).toContain(test_data[0].online_status);
    expect(fixture.debugElement.nativeElement.querySelector('#shared_delegates_status1').textContent).toContain(test_data[0].shared_delegates_status);
    expect(fixture.debugElement.nativeElement.querySelector('#delegate_fee1').textContent).toContain(test_data[0].delegate_fee);
    expect(fixture.debugElement.nativeElement.querySelector('#block_verifier_total_rounds1').textContent).toContain(test_data[0].block_verifier_total_rounds);
    expect(fixture.debugElement.nativeElement.querySelector('#block_verifier_online_percentage1').textContent).toContain(test_data[0].block_verifier_online_percentage);
    expect(fixture.debugElement.nativeElement.querySelector('#total_vote_count1').textContent).toContain(test_data[0].total_vote_count);
    expect(fixture.debugElement.nativeElement.querySelector('#block_verifier_score1').textContent).toContain(test_data[0].block_verifier_score);

    expect(fixture.debugElement.nativeElement.querySelector('#id2').textContent).toContain(test_data[1].id);
    expect(fixture.debugElement.nativeElement.querySelector('#delegatename2').textContent).toContain(test_data[1].delegate_name);
    expect(fixture.debugElement.nativeElement.querySelector('#online_status2').textContent).toContain(test_data[1].online_status);
    expect(fixture.debugElement.nativeElement.querySelector('#shared_delegates_status2').textContent).toContain(test_data[1].shared_delegates_status);
    expect(fixture.debugElement.nativeElement.querySelector('#delegate_fee2').textContent).toContain(test_data[1].delegate_fee);
    expect(fixture.debugElement.nativeElement.querySelector('#block_verifier_total_rounds2').textContent).toContain(test_data[1].block_verifier_total_rounds);
    expect(fixture.debugElement.nativeElement.querySelector('#block_verifier_online_percentage2').textContent).toContain(test_data[1].block_verifier_online_percentage);
    expect(fixture.debugElement.nativeElement.querySelector('#total_vote_count2').textContent).toContain(test_data[1].total_vote_count);
    expect(fixture.debugElement.nativeElement.querySelector('#block_verifier_score2').textContent).toContain(test_data[1].block_verifier_score);
    });

});
