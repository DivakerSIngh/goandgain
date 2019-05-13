import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGeneralProfileComponent } from './edit-general-profile.component';

describe('EditGeneralProfileComponent', () => {
  let component: EditGeneralProfileComponent;
  let fixture: ComponentFixture<EditGeneralProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditGeneralProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGeneralProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
