import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherRatingComponent } from './teacher-rating.component';

describe('TeacherRatingComponent', () => {
  let component: TeacherRatingComponent;
  let fixture: ComponentFixture<TeacherRatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherRatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
