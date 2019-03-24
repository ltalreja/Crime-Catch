import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UserCrisisComponent} from './user-crisis.component';

describe('UserCrisisComponent', () => {
  let component: UserCrisisComponent;
  let fixture: ComponentFixture<UserCrisisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserCrisisComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCrisisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
