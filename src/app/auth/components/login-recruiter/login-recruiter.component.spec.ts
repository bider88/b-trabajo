import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginRecruiterComponent } from './login-recruiter.component';

describe('LoginRecruiterComponent', () => {
  let component: LoginRecruiterComponent;
  let fixture: ComponentFixture<LoginRecruiterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginRecruiterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginRecruiterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
