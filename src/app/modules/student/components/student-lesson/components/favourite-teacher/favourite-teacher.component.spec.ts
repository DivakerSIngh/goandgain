import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouriteTeacherComponent } from './favourite-teacher.component';

describe('FavouriteTeacherComponent', () => {
  let component: FavouriteTeacherComponent;
  let fixture: ComponentFixture<FavouriteTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavouriteTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavouriteTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
