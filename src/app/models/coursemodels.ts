import { NgModule } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';

export interface coursemodels {
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
export class courseForm {
  modelForms: FormGroup = this.formBuilder.group({
        schoolName: ["", Validators.required],
        /*items: this.formBuilder.array([
            this.createItem()
        ])*/
  });
  modelForms2: FormGroup = this.formBuilder.group({
    courseName: ["", Validators.required],
    noOfCandidates:[0, Validators.required],
    duration: [0],
    startDate: ["",Validators.required],
    endDate: ["",Validators.required],
    remarks: [""],
    type: [""],
    noOfOficer:[0, Validators.required],
    noOfSailor:[0, Validators.required],
    noOfInterService:[0, Validators.required],
    noOfCivilian:[0, Validators.required],
    noOfForeigner:[0, Validators.required],
    noOfCadet:[0, Validators.required],
    noOfMidShipman:[0, Validators.required],
    noOfForeignStudent:[0, Validators.required],
    schoolName: ["", Validators.required]
  });
  createItem(): FormGroup {
    return this.formBuilder.group({
      courseName: [""],
      noOfCandidates:[0, Validators.required],
      duration: [0],
      startDate: [""],
      endDate: [""],
      remarks: [""]
    });
  }
  constructor(private formBuilder: FormBuilder) {}

}
