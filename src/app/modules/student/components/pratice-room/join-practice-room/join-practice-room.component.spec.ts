import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinPracticeRoomComponent } from './join-practice-room.component';

describe('JoinPracticeRoomComponent', () => {
  let component: JoinPracticeRoomComponent;
  let fixture: ComponentFixture<JoinPracticeRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinPracticeRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinPracticeRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
