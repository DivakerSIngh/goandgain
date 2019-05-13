import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentLessonsTabsComponent } from './student-lessons-tabs.component';

describe('StudentLessonsTabsComponent', () => {
  let component: StudentLessonsTabsComponent;
  let fixture: ComponentFixture<StudentLessonsTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentLessonsTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentLessonsTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
