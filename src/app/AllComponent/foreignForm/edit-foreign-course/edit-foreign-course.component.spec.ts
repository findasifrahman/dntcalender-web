import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditForeignCourseComponent } from './edit-foreign-course.component';

describe('EditForeignCourseComponent', () => {
  let component: EditForeignCourseComponent;
  let fixture: ComponentFixture<EditForeignCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditForeignCourseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditForeignCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
