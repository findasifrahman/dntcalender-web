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
export class teemplateForm {
  modelForms: FormGroup = this.formBuilder.group({
    ddayevent: ["", Validators.required],
    color: ["", Validators.required]

  });
  modelForms2: FormGroup = this.formBuilder.group({
    day: ["", Validators.required],
    activity: ["", Validators.required],
    notification: [false]
  });
  constructor(private formBuilder: FormBuilder) {}

}
