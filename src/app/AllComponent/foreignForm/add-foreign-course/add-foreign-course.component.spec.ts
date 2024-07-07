import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddForeignCourseComponent } from './add-foreign-course.component';

describe('AddForeignCourseComponent', () => {
  let component: AddForeignCourseComponent;
  let fixture: ComponentFixture<AddForeignCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddForeignCourseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddForeignCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
