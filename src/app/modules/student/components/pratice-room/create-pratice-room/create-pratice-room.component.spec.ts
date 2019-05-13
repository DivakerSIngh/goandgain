import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePraticeRoomComponent } from './create-pratice-room.component';

describe('CreatePraticeRoomComponent', () => {
  let component: CreatePraticeRoomComponent;
  let fixture: ComponentFixture<CreatePraticeRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePraticeRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePraticeRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
