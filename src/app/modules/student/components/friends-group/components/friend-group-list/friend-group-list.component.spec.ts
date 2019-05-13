import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendGroupListComponent } from './friend-group-list.component';

describe('FriendGroupListComponent', () => {
  let component: FriendGroupListComponent;
  let fixture: ComponentFixture<FriendGroupListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendGroupListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendGroupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
