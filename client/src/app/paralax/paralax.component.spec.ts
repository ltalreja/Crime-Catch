import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParalaxComponent } from './paralax.component';

describe('ParalaxComponent', () => {
  let component: ParalaxComponent;
  let fixture: ComponentFixture<ParalaxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParalaxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParalaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
