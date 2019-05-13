import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindTopicTabsComponent } from './find-topic-tabs.component';

describe('FindTopicTabsComponent', () => {
  let component: FindTopicTabsComponent;
  let fixture: ComponentFixture<FindTopicTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindTopicTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindTopicTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
