import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduledLessonComponent } from './scheduled-lesson.component';

describe('ScheduledLessonComponent', () => {
  let component: ScheduledLessonComponent;
  let fixture: ComponentFixture<ScheduledLessonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduledLessonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduledLessonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
