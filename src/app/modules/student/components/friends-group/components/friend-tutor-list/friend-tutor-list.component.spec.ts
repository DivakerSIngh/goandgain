import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendTutorListComponent } from './friend-tutor-list.component';

describe('FriendTutorListComponent', () => {
  let component: FriendTutorListComponent;
  let fixture: ComponentFixture<FriendTutorListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendTutorListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendTutorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
