import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralAvailabilityComponent } from './general-availability.component';

describe('GeneralAvailabilityComponent', () => {
  let component: GeneralAvailabilityComponent;
  let fixture: ComponentFixture<GeneralAvailabilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralAvailabilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralAvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
