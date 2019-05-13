import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditIntroductionComponent } from './edit-introduction.component';

describe('EditIntroductionComponent', () => {
  let component: EditIntroductionComponent;
  let fixture: ComponentFixture<EditIntroductionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditIntroductionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditIntroductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
