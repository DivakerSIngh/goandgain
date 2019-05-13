import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindTopicComponent } from './find-topic.component';

describe('FindTopicComponent', () => {
  let component: FindTopicComponent;
  let fixture: ComponentFixture<FindTopicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindTopicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
