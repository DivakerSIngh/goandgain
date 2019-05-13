import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnscheduledLessonComponent } from './unscheduled-lesson.component';

describe('UnscheduledLessonComponent', () => {
  let component: UnscheduledLessonComponent;
  let fixture: ComponentFixture<UnscheduledLessonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnscheduledLessonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnscheduledLessonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
