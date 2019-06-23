import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { delegates_informationComponent } from './delegates_information.component';

describe('delegates_informationComponent', () => {
  let component: delegates_informationComponent;
  let fixture: ComponentFixture<delegates_informationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ delegates_informationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(delegates_informationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
