import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEditLessonsComponent } from './view-edit-lessons.component';

describe('ViewEditLessonsComponent', () => {
  let component: ViewEditLessonsComponent;
  let fixture: ComponentFixture<ViewEditLessonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewEditLessonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEditLessonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
