import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { statisticsComponent } from './statistics.component';

describe('statisticsComponent', () => {
  let component: statisticsComponent;
  let fixture: ComponentFixture<statisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ statisticsComponent ]
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
