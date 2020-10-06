import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ExampleDatabase, ExampleDataSource } from './helpers.data';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatTableModule } from '@angular/material';
import {RouterTestingModule} from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {httpdataservice} from 'app/services/http-request.service';

import { delegates_voters_listComponent } from './delegates_voters_list.component';

describe('delegates_voters_listComponent', () => {
  let component: delegates_voters_listComponent;
  let fixture: ComponentFixture<delegates_voters_listComponent>;
  let test_data: any[] = [
    { id: "1", public_address_created_reserve_proof: 'XCA', total: "0", reserve_proof: "reserve_proof" },
    { id: "2", public_address_created_reserve_proof: 'XCA', total: "0", reserve_proof: "reserve_proof" }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ delegates_voters_listComponent ],
      imports: [HttpClientTestingModule,RouterTestingModule,MatTableModule],
      providers: [ httpdataservice ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(delegates_voters_listComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // check that all html components are created
  it('should create', () => expect(component).toBeTruthy());

  it('should create dash card one', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard1')).toBeTruthy());
  it('should set dash card ones title', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard1').dashData.title).toBe('VOTE COUNT'));
  it('should set dash card ones property to a number', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard1').dashData.text).toBe(0));

  it('should create dash card two', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard2')).toBeTruthy());
  it('should set dash card twos title', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard2').dashData.title).toBe('VOTERS'));
  it('should set dash card twos property to a number', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard2').dashData.text).toBe(0));

  it('should create reserve_proofs table', () => expect(fixture.debugElement.nativeElement.querySelector('#reserve_proofs_table')).toBeTruthy());

  // test the code
  it('should update reserve_proofs table', () => {
    component.exampleDatabase = new ExampleDatabase();
    test_data.forEach((item) => component.exampleDatabase.addUser(item.id,item.public_address_created_reserve_proof,item.total,item.reserve_proof));
    component.dataSource = new ExampleDataSource(component.exampleDatabase);

    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('#id1').textContent).toContain(test_data[0].id);
    expect(fixture.debugElement.nativeElement.querySelector('#public_address_created_reserve_proof1').textContent).toContain(test_data[0].public_address_created_reserve_proof);
    expect(fixture.debugElement.nativeElement.querySelector('#total1').textContent).toContain(test_data[0].total);
    expect(fixture.debugElement.nativeElement.querySelector('#reserve_proof1').textContent).toContain(test_data[0].reserve_proof);

    expect(fixture.debugElement.nativeElement.querySelector('#id2').textContent).toContain(test_data[1].id);
    expect(fixture.debugElement.nativeElement.querySelector('#public_address_created_reserve_proof2').textContent).toContain(test_data[1].public_address_created_reserve_proof);
    expect(fixture.debugElement.nativeElement.querySelector('#total2').textContent).toContain(test_data[1].total);
    expect(fixture.debugElement.nativeElement.querySelector('#reserve_proof2').textContent).toContain(test_data[1].reserve_proof);
    });
});
