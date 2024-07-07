import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForeignCourseComponent } from './foreign-course.component';

describe('ForeignCourseComponent', () => {
  let component: ForeignCourseComponent;
  let fixture: ComponentFixture<ForeignCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForeignCourseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForeignCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
