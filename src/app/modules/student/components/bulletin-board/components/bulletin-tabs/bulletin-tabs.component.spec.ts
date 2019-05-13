import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BulletinTabsComponent } from './bulletin-tabs.component';

describe('BulletinTabsComponent', () => {
  let component: BulletinTabsComponent;
  let fixture: ComponentFixture<BulletinTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BulletinTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulletinTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
