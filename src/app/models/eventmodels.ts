import { NgModule } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';

export interface eventmodels {
  eventName: string,
  DdayStart: string,
  isFullDay: number,
  mainColor: string,
  DdayEnd:string
}
@NgModule({
  imports: [ReactiveFormsModule, FormsModule],
  exports:[]
})
export class eventForm {
  modelForms: FormGroup = this.formBuilder.group({
    title: ["", Validators.required],
    start: ["", Validators.required],
    end: ["", Validators.required],
    color: ["", Validators.required],
    description: [""],
    notification: [false]

  });

  constructor(private formBuilder: FormBuilder) {}

}
