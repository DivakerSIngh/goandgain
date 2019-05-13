import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherProfileLeftbarComponent } from './teacher-profile-leftbar.component';

describe('TeacherProfileLeftbarComponent', () => {
  let component: TeacherProfileLeftbarComponent;
  let fixture: ComponentFixture<TeacherProfileLeftbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherProfileLeftbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherProfileLeftbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
