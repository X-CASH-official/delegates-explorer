import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { delegates_statisticsComponent } from './delegates_statistics.component';

describe('delegates_statisticsComponent', () => {
  let component: delegates_statisticsComponent;
  let fixture: ComponentFixture<delegates_statisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ delegates_statisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(delegates_statisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
