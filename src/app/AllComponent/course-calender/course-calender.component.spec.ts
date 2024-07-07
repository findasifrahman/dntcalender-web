import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseCalenderComponent } from './course-calender.component';

describe('CourseCalenderComponent', () => {
  let component: CourseCalenderComponent;
  let fixture: ComponentFixture<CourseCalenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseCalenderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseCalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
