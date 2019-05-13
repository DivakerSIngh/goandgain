import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PastClassesComponent } from './past-classes.component';

describe('PastClassesComponent', () => {
  let component: PastClassesComponent;
  let fixture: ComponentFixture<PastClassesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PastClassesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PastClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
