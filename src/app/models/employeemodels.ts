import { NgModule } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';

export interface employeemodels {
  vendorName: string,
  username: string,
  roleId: number,
  joiniDate: string,
  otherinfo:string,
  email: string,
  password: string,
  phone: string,
  packageAmount: number
}
@NgModule({
  imports: [ReactiveFormsModule, FormsModule],
  exports:[]
})
export class employeemodelsform {
  modelForms: FormGroup = this.formBuilder.group({
    username: ["", Validators.required],
    password: ["", Validators.required],
    roleId: [0],
    uniqueid: [""]

  });

  constructor(private formBuilder: FormBuilder) {}

}
