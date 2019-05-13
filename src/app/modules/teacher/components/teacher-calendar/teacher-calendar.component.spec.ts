import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherCalendarComponent } from './teacher-calendar.component';

describe('TeacherCalendarComponent', () => {
  let component: TeacherCalendarComponent;
  let fixture: ComponentFixture<TeacherCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
