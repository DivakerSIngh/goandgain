import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BulletinCommentsComponent } from './bulletin-comments.component';

describe('BulletinCommentsComponent', () => {
  let component: BulletinCommentsComponent;
  let fixture: ComponentFixture<BulletinCommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BulletinCommentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulletinCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
