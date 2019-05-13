import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentStatusCalendarComponent } from './student-status-calendar.component';

describe('StudentStatusCalendarComponent', () => {
  let component: StudentStatusCalendarComponent;
  let fixture: ComponentFixture<StudentStatusCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentStatusCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentStatusCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
