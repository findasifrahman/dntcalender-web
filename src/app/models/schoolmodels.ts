import { NgModule } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';

export interface models {
    schoolName: string,
}
@NgModule({
  imports: [ReactiveFormsModule, FormsModule],
  exports:[]
})
export class schoolForm {
  modelForms: FormGroup = this.formBuilder.group({
    schoolName: ["", Validators.required],
  });

  constructor(private formBuilder: FormBuilder) {}

}