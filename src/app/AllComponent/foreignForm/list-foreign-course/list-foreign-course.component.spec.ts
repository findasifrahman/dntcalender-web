import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListForeignCourseComponent } from './list-foreign-course.component';

describe('ListForeignCourseComponent', () => {
  let component: ListForeignCourseComponent;
  let fixture: ComponentFixture<ListForeignCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListForeignCourseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListForeignCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
