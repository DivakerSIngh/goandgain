import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassRatesComponent } from './class-rates.component';

describe('ClassRatesComponent', () => {
  let component: ClassRatesComponent;
  let fixture: ComponentFixture<ClassRatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassRatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
