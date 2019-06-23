import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { delegates_voters_listComponent } from './delegates_voters_list.component';

describe('delegates_voters_listComponent', () => {
  let component: delegates_voters_listComponent;
  let fixture: ComponentFixture<delegates_voters_listComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ delegates_voters_listComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(delegates_voters_listComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
