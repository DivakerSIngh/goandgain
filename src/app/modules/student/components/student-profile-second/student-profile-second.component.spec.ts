import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentProfileSecondComponent } from './student-profile-second.component';

describe('StudentProfileSecondComponent', () => {
  let component: StudentProfileSecondComponent;
  let fixture: ComponentFixture<StudentProfileSecondComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentProfileSecondComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentProfileSecondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
