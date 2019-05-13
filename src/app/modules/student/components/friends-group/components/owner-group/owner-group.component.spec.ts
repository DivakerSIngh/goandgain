import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerGroupComponent } from './owner-group.component';

describe('OwnerGroupComponent', () => {
  let component: OwnerGroupComponent;
  let fixture: ComponentFixture<OwnerGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnerGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
