import { NgModule } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';

export interface devicemodels {
  uid: string,
  userId: number,
  deviceName: string,
  simNo:string,
  activateDate: string,
  expireDate: string,
  monthFee: number,
  bkash: string,
  address: string,
  backup_day: string
}
@NgModule({
  imports: [ReactiveFormsModule, FormsModule],
  exports:[]
})
export class devicemodelsform {
  modelForms: FormGroup = this.formBuilder.group({
    uid: ["", Validators.required],
    userId: [""],
    deviceName: [""],
    simNo: [""],
    activateDate: [""],
    expireDate: [""],
    monthFee: [0],
    bkash: [""],
    address: [""],
    device_model: [""],
    backup_day: [0]
  });

  constructor(private formBuilder: FormBuilder) {}

}
