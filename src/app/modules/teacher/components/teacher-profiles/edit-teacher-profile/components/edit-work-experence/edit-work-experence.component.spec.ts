import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWorkExperenceComponent } from './edit-work-experence.component';

describe('EditWorkExperenceComponent', () => {
  let component: EditWorkExperenceComponent;
  let fixture: ComponentFixture<EditWorkExperenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditWorkExperenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditWorkExperenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
