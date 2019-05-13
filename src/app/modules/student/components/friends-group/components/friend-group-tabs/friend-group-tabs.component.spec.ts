import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendGroupTabsComponent } from './friend-group-tabs.component';

describe('FriendGroupTabsComponent', () => {
  let component: FriendGroupTabsComponent;
  let fixture: ComponentFixture<FriendGroupTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendGroupTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendGroupTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
