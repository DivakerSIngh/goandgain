import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsGroupComponent } from './friends-group.component';

describe('FriendsGroupComponent', () => {
  let component: FriendsGroupComponent;
  let fixture: ComponentFixture<FriendsGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendsGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
