import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstantTutoringMarkComponent } from './instant-tutoring-mark.component';

describe('InstantTutoringMarkComponent', () => {
  let component: InstantTutoringMarkComponent;
  let fixture: ComponentFixture<InstantTutoringMarkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstantTutoringMarkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstantTutoringMarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
