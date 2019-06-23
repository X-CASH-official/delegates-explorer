import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { delegatesComponent } from './delegates.component';

describe('delegatesComponent', () => {
  let component: delegatesComponent;
  let fixture: ComponentFixture<delegatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ delegatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(delegatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
