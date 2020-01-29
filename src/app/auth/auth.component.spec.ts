import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';


import { AuthComponent } from './auth.component';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthComponent ],
      imports: [FlexLayoutModule],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());
  it('should create logo1', () => expect(fixture.debugElement.nativeElement.querySelector('#logo1').src).toBe('http://localhost:9876/src/assets/images/xcash.png'));
  it('should create logo2', () => expect(fixture.debugElement.nativeElement.querySelector('#logo2').src).toBe('http://localhost:9876/src/assets/images/xcash.png'));
});
