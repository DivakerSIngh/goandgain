import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherProfilesComponent } from './teacher-profiles.component';

describe('TeacherProfilesComponent', () => {
  let component: TeacherProfilesComponent;
  let fixture: ComponentFixture<TeacherProfilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherProfilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
