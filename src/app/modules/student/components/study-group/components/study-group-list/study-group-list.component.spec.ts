import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyGroupListComponent } from './study-group-list.component';

describe('StudyGroupListComponent', () => {
  let component: StudyGroupListComponent;
  let fixture: ComponentFixture<StudyGroupListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudyGroupListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyGroupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
