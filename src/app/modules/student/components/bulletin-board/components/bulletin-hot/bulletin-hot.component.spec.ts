import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BulletinHotComponent } from './bulletin-hot.component';

describe('BulletinHotComponent', () => {
  let component: BulletinHotComponent;
  let fixture: ComponentFixture<BulletinHotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BulletinHotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulletinHotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
