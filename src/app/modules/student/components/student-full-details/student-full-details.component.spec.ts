import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentFullDetailsComponent } from './student-full-details.component';

describe('StudentFullDetailsComponent', () => {
  let component: StudentFullDetailsComponent;
  let fixture: ComponentFixture<StudentFullDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentFullDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentFullDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
