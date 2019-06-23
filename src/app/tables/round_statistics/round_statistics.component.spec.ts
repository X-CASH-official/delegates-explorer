import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { round_statisticsComponent } from './round_statistics.component';

describe('round_statisticsComponent', () => {
  let component: round_statisticsComponent;
  let fixture: ComponentFixture<round_statisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ round_statisticsComponent ]
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
