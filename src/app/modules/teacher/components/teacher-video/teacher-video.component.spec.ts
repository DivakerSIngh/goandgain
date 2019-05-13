import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherVideoComponent } from './teacher-video.component';

describe('TeacherVideoComponent', () => {
  let component: TeacherVideoComponent;
  let fixture: ComponentFixture<TeacherVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
