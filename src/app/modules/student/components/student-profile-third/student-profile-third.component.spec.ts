import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentProfileThirdComponent } from './student-profile-third.component';

describe('StudentProfileThirdComponent', () => {
  let component: StudentProfileThirdComponent;
  let fixture: ComponentFixture<StudentProfileThirdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentProfileThirdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentProfileThirdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
