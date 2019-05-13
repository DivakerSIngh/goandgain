import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BulletinCreateComponent } from './bulletin-create.component';

describe('BulletinCreateComponent', () => {
  let component: BulletinCreateComponent;
  let fixture: ComponentFixture<BulletinCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BulletinCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulletinCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
