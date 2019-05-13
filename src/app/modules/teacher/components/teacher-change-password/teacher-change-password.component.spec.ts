import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherChangePasswordComponent } from './teacher-change-password.component';

describe('TeacherChangePasswordComponent', () => {
  let component: TeacherChangePasswordComponent;
  let fixture: ComponentFixture<TeacherChangePasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherChangePasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
