import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileLeftbarComponent } from './profile-leftbar.component';

describe('ProfileLeftbarComponent', () => {
  let component: ProfileLeftbarComponent;
  let fixture: ComponentFixture<ProfileLeftbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileLeftbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileLeftbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
