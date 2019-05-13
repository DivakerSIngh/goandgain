import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentProfileFourthComponent } from './student-profile-fourth.component';

describe('StudentProfileFourthComponent', () => {
  let component: StudentProfileFourthComponent;
  let fixture: ComponentFixture<StudentProfileFourthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentProfileFourthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentProfileFourthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
