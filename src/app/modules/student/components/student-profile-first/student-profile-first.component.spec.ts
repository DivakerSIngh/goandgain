import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentProfileFirstComponent } from './student-profile-first.component';

describe('StudentProfileFirstComponent', () => {
  let component: StudentProfileFirstComponent;
  let fixture: ComponentFixture<StudentProfileFirstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentProfileFirstComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentProfileFirstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
