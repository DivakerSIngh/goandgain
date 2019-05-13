import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLessonTopicComponent } from './add-lesson-topic.component';

describe('AddLessonTopicComponent', () => {
  let component: AddLessonTopicComponent;
  let fixture: ComponentFixture<AddLessonTopicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLessonTopicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLessonTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
