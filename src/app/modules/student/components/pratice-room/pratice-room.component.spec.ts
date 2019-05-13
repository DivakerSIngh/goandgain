import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PraticeRoomComponent } from './pratice-room.component';

describe('PraticeRoomComponent', () => {
  let component: PraticeRoomComponent;
  let fixture: ComponentFixture<PraticeRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PraticeRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PraticeRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
